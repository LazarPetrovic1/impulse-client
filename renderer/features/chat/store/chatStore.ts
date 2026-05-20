import { create } from 'zustand';
import { Message, MessageStatus, Reaction } from '../types/message';
import { Operation } from '../types';
import { MAX_MESSAGES } from '../../../constants';
import { saveMessages } from '../../../lib/storage';
import { useAuthStore } from '../../auth/store';

const sortMessages = (msgs: Message[]) => {
  return [...msgs].sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;

    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
};

const trimMessages = (msgs: Message[]) => {
  return msgs.length > MAX_MESSAGES
    ? msgs.slice(-MAX_MESSAGES)
    : msgs;
};

const normalizeMessage = (msg: Message): Message => {
  const user = useAuthStore.getState().user;
  
  return {
    ...msg,
    isOwn: msg.sender == user.id || msg.senderId == user.id,
    replyTo: msg.replyTo ? { ...msg.replyTo, isOwn: msg.replyTo.sender == user.id } : undefined,
    reactions: msg.reactions ?? [],
  };
};

const normalizeBulk = (msgs: Message[], state: ChatState) =>
  msgs.map((m) => normalizeMessage(m));

export type ChatState = {
  messages: Record<string, Message[]>;
  addMessage: (msg: Message) => void;
  removeMessage: (chatId: string, msgId: number) => void;
  reconcileMessage: (msg: Message) => void;
  markFailed: (tempId: string, chatId: string) => void;
  prependMessages: (chatId: string, msgs: Message[]) => void;
  reconcileBulk: (chatId: string, msgs: Message[]) => void;
  updateMessage: (msg: Partial<Message>) => void;
  seenBy: Record<string, Record<string, string>>;
  updateSeen: (chatId: string, userId: string, messageId: string) => void;
  operations: Record<string, Operation[]>;
  applyOperation: (op: Operation) => void;
  batchMessages: (chatId: string, msgs: Message[]) => void;
  hydrateReactions: (messageId: number, reactions: Reaction[]) => void;
  addReactionLocal: (messageId: number, emoji: string, userId: number) => void;
  setReactions: (messageId: number, reactions: Reaction[], chatId: string) => void;
  typing: Record<string, Record<number, { isTyping: boolean; username: string }>>;
  setTyping: (chatId: string, userId: number, username: string, isTyping: boolean) => void;
  clearTyping: (chatId: string, userId: number) => void;
  deliveredBy: Record<string, Record<string, string>>;
  updateDelivered: (chatId: string, userId: string, messageId: string) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  typing: {},
  messages: {},
  seenBy: {},
  deliveredBy: {},
  operations: {},
  addMessage: (msg) =>
    set((state) => {
      const normalized: Message = normalizeMessage(msg);
      const chatMsgs = state.messages[msg.chatId] || [];
      const sorted = sortMessages([...chatMsgs, normalized]);
      return { messages: { ...state.messages, [msg.chatId]: trimMessages(sorted) } };
    }),
  removeMessage: (chatId, msgId) =>
    set((state) => {
      const chatMsgs = state.messages[chatId] || [];
      return {
        messages: {
          ...state.messages,
          [chatId]: trimMessages(sortMessages(chatMsgs.filter(cm => cm.id !== msgId)))
        }
      }
    }),
  reconcileMessage: (incoming) =>
    set((state) => {
      if (!incoming) return state;

      // -------------------------------------------------
      // 0. Resolve chatId (including fallback for deletes)
      // -------------------------------------------------
      let chatId = incoming.chatId ?? incoming.chat?.id;

      if (!chatId && incoming.id) {
        for (const [cid, msgs] of Object.entries(state.messages)) {
          if (msgs.some((m) => String(m.id) === String(incoming.id))) {
            chatId = cid;
            break;
          }
        }
      }

      if (!chatId) return state;
      const chatMsgs = state.messages[chatId] || [];
      const normalized = { ...incoming, chatId };
      let finalList = chatMsgs;
      let replaced = false;
      const matchId = (a: any, b: any) => String(a) === String(b);

      // -------------------------------------------------
      // 1. DELETE (HIGHEST PRIORITY — MUST RUN FIRST)
      // -------------------------------------------------
      if (normalized.deleted && normalized.id) {
        finalList = chatMsgs.map((m) =>
          matchId(m.id, normalized.id) ? { ...m, deleted: true } : m
        );

        return {
          messages: { ...state.messages, [chatId]: trimMessages(sortMessages(finalList)) },
        };
      }

      // -------------------------------------------------
      // 2. UPDATE / REPLACE (id or tempId match)
      // -------------------------------------------------
      finalList = chatMsgs.map((msg) => {
        // ID match (edit/update/reaction)
        if (normalized.id && matchId(msg.id, normalized.id)) {
          replaced = true;
          return { ...msg, ...normalized };
        }

        // tempId match (optimistic → real)
        if (msg.tempId && normalized.tempId && msg.tempId === normalized.tempId) {
          replaced = true;
          return {
            ...msg,
            ...normalized,
            id: normalized.id ?? msg.id,
            status: "sent" as MessageStatus,
          };
        }

        return msg;
      });

      // -------------------------------------------------
      // 3. LAST RESORT MATCH (rare fallback sync case)
      // -------------------------------------------------
      if (!replaced && normalized.id) {
        const idx = finalList.findIndex((m) =>
          m.content === normalized.content &&
          m.senderId === normalized.senderId &&
          Math.abs(
            new Date(m.createdAt).getTime() -
            new Date(normalized.createdAt).getTime()
          ) < 5000
        );

        if (idx !== -1) {
          finalList[idx] = {
            ...finalList[idx],
            ...normalized,
            status: "sent",
          };
          replaced = true;
        }
      }

      // -------------------------------------------------
      // 4. INSERT (only if nothing matched)
      // -------------------------------------------------
      if (!replaced) {
        const now = new Date(normalized.createdAt || Date.now()).getTime();
        const duplicateIndex = finalList.findIndex((m) =>
          !m.id &&
          m.content === normalized.content &&
          m.senderId === normalized.senderId &&
          Math.abs(new Date(m.createdAt || 0).getTime() - now) < 3000
        );

        if (duplicateIndex !== -1) {
          finalList = [
            ...finalList.slice(0, duplicateIndex),
            ...finalList.slice(duplicateIndex + 1),
          ];
        }

        finalList = [...finalList, { ...normalized }];
      }

      // -------------------------------------------------
      // 5. REACTIONS
      // -------------------------------------------------
      if (normalized.reactions && normalized.id) {
        finalList = finalList.map((m) =>
          matchId(m.id, normalized.id)
            ? { ...m, reactions: normalized.reactions } : m
        );
      }

      // -------------------------------------------------
      // 6. FINAL OUTPUT
      // -------------------------------------------------
      const final = trimMessages(sortMessages(finalList));

      return { messages: { ...state.messages, [chatId]: final } };
    }),
  markFailed: (tempId: string, chatId: string) =>
    set((state) => {
      const chatMsgs = state.messages[chatId] || [];
      const sorted = sortMessages(chatMsgs);
      return {
        messages: {
          ...state.messages,
          [chatId]: trimMessages(sorted.map((msg) => msg.tempId === tempId ? { ...msg, status: 'failed' } : msg)),
        },
      };
    }),
  prependMessages: (chatId: string, msgs: Message[]) =>
    set((state) => {
      const existing = state.messages[chatId] || [];
      const merged = [...msgs, ...existing];

      // dedupe by id
      const unique = sortMessages(
        normalizeBulk(
          Array.from(new Map(merged.map((m) => [m.id || m.tempId, m])).values()), state
        )
      );
      return { messages: { ...state.messages, [chatId]: trimMessages(unique) } };
    }),
  reconcileBulk: (chatId: string, msgs: Message[]) =>
    set((state) => {
      const existing = state.messages[chatId] || [];
      const merged = [...existing, ...msgs];
      const unique = sortMessages(
        normalizeBulk(
          Array.from(new Map(merged.map((m) => [m.id || m.tempId, m])).values()), state
        )
      );
      return { messages: { ...state.messages, [chatId]: trimMessages(unique) } };
    }),
  updateMessage: (incoming) =>
    set((state) => {
      const chatId = incoming.chatId;
      const chatMsgs = state.messages[chatId] || [];

      return {
        messages: {
          ...state.messages,
          [incoming.chatId]: trimMessages(
            sortMessages(
              chatMsgs.map((msg) => {
                if (msg.id !== incoming.id) return msg;
                return { ...msg, ...incoming, reactions: incoming.reactions ?? msg.reactions }
              })
            )
          )
        },
      };
    }),
  updateSeen: (chatId, userId, messageId) => set((state) => ({
    seenBy: {
      ...state.seenBy,
      [chatId]: {
        ...(state.seenBy[chatId] || {}),
        [userId]: String(messageId),
      },
    },
  })),
  applyOperation: (op: Operation) =>
    set((state) => {
      const ops = state.operations[op.messageId] || [];
      return { operations: { ...state.operations, [op.messageId]: [...ops, op] } };
    }),
  batchMessages: (chatId, msgs) => set((state) => {
    const existing = state.messages[chatId] || [];
    const merged = [...existing, ...msgs];
    saveMessages(normalizeBulk(msgs, state));
    return {
      messages: {
        ...state.messages,
        [chatId]: merged,
      },
    };
  }),
  hydrateReactions: (messageId: number, reactions: Reaction[]) =>
  set((state) => {
    const newMessages = { ...state.messages };

    for (const chatId in newMessages) {
      newMessages[chatId] = newMessages[chatId].map((msg) =>
        msg.id === messageId
          ? { ...msg, reactions }
          : msg
      );
    }

    return { messages: newMessages };
  }),
  addReactionLocal: (messageId, emoji, userId) => set((state) => {
    const messages = { ...state.messages };
    for (const chatId in messages) {
      const updated = messages[chatId].map((msg) => {
        if (msg.id !== messageId) return msg;
        const reactions = msg.reactions || [];
        const exists = reactions.some((r) => r.userId === userId && r.emoji === emoji);
        const newReactions = exists ?
          reactions.filter((r) => !(r.userId === userId && r.emoji === emoji)) :
          [...reactions, { userId, emoji }];

        return { ...msg, reactions: newReactions };
      });
      messages[chatId] = updated;
    }

    return { messages };
  }),
  setReactions: (messageId, reactions, chatId) => set((state) => {
    const msgs = state.messages[chatId] || [];
    return {
      messages: {
        ...state.messages,
        [chatId]: msgs.map((m) =>
          m.id === messageId ? { ...m, reactions } : m
        ),
      },
    };
  }),
  setTyping: (chatId, userId, username, value) =>
    set((state) => {
      const chatTyping = { ...(state.typing[chatId] || {}) };

      if (!value) {
        delete chatTyping[userId];
      } else {
        chatTyping[userId] = { isTyping: true, username };
      }

      return {
        typing: {
          ...state.typing,
          [chatId]: chatTyping,
        },
      };
    }),
  clearTyping: (chatId, userId) =>
    set((state) => {
      const chatTyping = { ...(state.typing[chatId] || {}) };
      delete chatTyping[userId];

      return {
        typing: {
          ...state.typing,
          [chatId]: chatTyping,
        },
      };
    }),
  updateDelivered: (chatId: string, userId: string, messageId: string) => set((state) => ({
    deliveredBy: {
      ...state.deliveredBy,
      [chatId]: {
        ...(state.deliveredBy[chatId] || {}),
        [userId]: messageId,
      },
    },
  })),
}));
