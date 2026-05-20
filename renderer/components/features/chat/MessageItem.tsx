import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { ContextMenu } from "../../common";
import { Message, MessageStatus } from "../../../features/chat/types";
import { useChatStore, useReplyStore } from "../../../features/chat/store";
import { play, useAlertStore } from "../../../features/alerts";
import { useDeleteMessage } from "../../../features/chat/store/useDeleteMessage";
import { Theme } from "../../../styles/theme/type";
import { registerMessageRef, scrollToMessage } from "../../../features/chat/hooks";
import { useAuthStore } from "../../../features/auth/store";
import { ReactionBar } from "./ReactionBar";
import { EmojiPickerPopover } from "./EmojiPicker";
import { groupReactions } from "../../../features/chat/utils/groupReactions";
import { MessageReactions } from "./MessageReactions";
import { getSocket, SocketEvents } from "../../../lib/socket";
import { getMessageDeliveryStatus, isMessageSeen } from "../../../features/chat/utils";

const renderStatus = (status?: MessageStatus) => {
  switch (status) {
    case "sending": return { icon: "⏳", title: "Sending..." };
    case "sent": return { icon: "✓", title: "Sent" };
    case "delivered": return { icon: "✓✓", title: "Delivered" };
    case "seen": return { icon: "👁", title: "Seen" };
    case "failed": return { icon: "❌", title: "Failed" };
    default: return { icon: null, title: null };
  }
};

const Row = styled.div<{ $isOwn: boolean }>`
  display: flex;
  justify-content: ${({ $isOwn }) => ($isOwn ? "flex-end" : "flex-start")};
  padding: 6px 10px;
  width: 100%;
  position: relative;
  &.highlight { animation: flash 1.5s ease; }
  @keyframes flash {
    0% { background: rgba(45,108,223,0.4); }
    100% { background: transparent; }
  }
`;

const ReactionBarWrapper = styled.div`
  position: absolute;
  top: -20px;
  width: 100px;
  right: 0;
  background: ${( { theme } : { theme: Theme }) => theme.colors.background};
  border-radius: 20px;
  padding: 4px 8px;
  display: flex;
  gap: 6px;
  opacity: 0;
  transform: translateY(5px);
  transition: 0.15s;
  span { cursor: pointer; font-size: 14px; }
`;

const Bubble = styled.div<{ $status: string; $isOwn: boolean }>`
  background: ${({ $isOwn }) => ($isOwn ? "#2b6ef2" : "#222")};
  color: white;
  padding: 10px 12px;
  border-radius: 12px;
  max-width: 60%;
  position: relative;
  opacity: ${({ $status }) => ($status === "failed" ? 0.5 : 1)};
  &:hover ${ReactionBarWrapper} {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ReplyBox = styled.div`
  border-left: 3px solid ${({ theme } : { theme: Theme }) => theme.colors.border};
  padding: 6px 8px;
  margin-bottom: 6px;
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  border-radius: 6px;
  cursor: pointer;

  .reply-author {
    font-size: 11px;
    font-weight: bold;
    color: #8ab4ff;
  }

  .reply-content {
    font-size: 12px;
    opacity: 0.8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background: ${({ theme } : { theme: Theme }) => theme.colors.hover};
  }
`;

export const MessageItem = ({ message }: { message: Message }) => {
  const seenBy = useChatStore((s) => s.seenBy);
  const deliveredBy = useChatStore((s) => s.deliveredBy);
  const [isEditing, setIsEditing] = useState(() => false);
  const [draft, setDraft] = useState(() => message.content);
  const ref = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const { deleteMessage } = useDeleteMessage();
  const { setReply } = useReplyStore(); // lightweight store
  const addAlert = useAlertStore(s => s.addAlert)
  const [showPicker, setShowPicker] = useState<boolean>(() => false);
  const user = useAuthStore((s) => s.user);
  const isOwn = (message.isOwn || message?.senderId === user.id || message?.sender?.id === user.id);
  const socket = getSocket()
  const addReactionLocal = useChatStore((s) => s.addReactionLocal);
  useEffect(() => {
    registerMessageRef(message?.id?.toString(), ref.current);
    return () => registerMessageRef(message?.id?.toString(), null);
  }, [message.id]);  
  useEffect(() => {
    if (!message.id) return;
    if (isOwn) return;
    const el = ref.current;
    if (!el) return;
    const scrollContainer = document.querySelector("[data-chat-scroll]");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (message.seen) return;
          console.log("TRIGGERING EMISSIONS", { messageId: message.id, chatId: message.chatId }); // logs
          socket.emit(SocketEvents.MESSAGE_SEE, { messageId: message.id, chatId: message.chatId || message.chat?.id }); // doesn't log from within a different function
          observer.disconnect(); // ✅ only fire once
        }
      }, { threshold: 0.6, root: scrollContainer } // 👈 tweak (0.5–0.8 is ideal)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [message.id, isOwn]);
  
  const status = getMessageDeliveryStatus(message.id, message.chatId, String(user.id), deliveredBy, seenBy);
  const grouped = groupReactions(message.reactions ?? []);
  const handleEditSave = () => {
    if (!message.id) return;
    if (draft.trim() === message.content) {
      setIsEditing(() => false);
      return;
    }
    // ✅ send to server
    socket.emit(SocketEvents.MESSAGE_EDIT, { id: message.id, message: { content: draft } });
    setIsEditing(() => false);
  };
  const react = useCallback((emoji: string) => {
    addReactionLocal(message.id, emoji, user.id);
    socket.emit(SocketEvents.MESSAGE_REACT, { messageId: message.id, emoji });
  }, [message.id, user.id]);
  const handleReply = () => setReply(message);
  const handleDelete = () => {
    if (!message.id) return;
    if (!confirm("Delete message?")) return;
    deleteMessage(message.id, message.chatId);
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      addAlert({ id: crypto.randomUUID(), message: "Copied!", type: "success" });
      play(`/sound-effects/alerts/alert-spawn.mp3`);
    } catch { console.error("Copy failed"); }
  };
  return (
    <Row $isOwn={isOwn} ref={ref}>
      <Bubble $isOwn={isOwn} ref={bubbleRef} $status={message.status}>
        <ContextMenu outerRef={bubbleRef}>
          <li onClick={handleReply}>Reply</li>
          <li onClick={handleCopy}>Copy</li>
          {isOwn && <li onClick={handleDelete}>Delete</li>}
          {isOwn && <li onClick={() => { setDraft(message.content); setIsEditing(true); }}>Edit</li>}
        </ContextMenu>
        {message.replyTo && (
          <ReplyBox onClick={() => scrollToMessage(message.replyTo!.id.toString())}>
            <div className="reply-author">
              {message.replyTo.senderName || "User"}
            </div>
            <div className="reply-content">
              {message.replyTo.content}
            </div>
          </ReplyBox>
        )}
        <ReactionBarWrapper>
          <ReactionBar
            onReact={(emoji) => {
              if (emoji === "➕") return setShowPicker((p) => !p);
              react(emoji);
            }}
          />
        </ReactionBarWrapper>
        
        <div style={{ wordBreak: "break-word" }}>
          {message.deleted ? (
            <i style={{ opacity: 0.6 }}>Message deleted</i>
          ) : isEditing ? (
            <input
              value={draft}
              autoFocus
              onChange={(e) => setDraft(() => e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!e.defaultPrevented) e.preventDefault();   // 🔥 stops form submit
                  if (!e.isPropagationStopped()) e.stopPropagation();  // 🔥 stops bubbling
                  handleEditSave();
                }

                if (e.key === "Escape") {
                  if (!e.defaultPrevented) e.preventDefault();
                  if (!e.isPropagationStopped()) e.stopPropagation();
                  setIsEditing(() => false);
                }
              }}
              onKeyUp={(e) => e.stopPropagation()}
              onBlur={handleEditSave}
              style={{ width: "100%" }}
            />
          ) : message.content}
          {message.isEdited && (
            <span style={{ fontSize: 12, opacity: 0.6, marginLeft: 6 }}>
              (edited)
            </span>
          )}
        </div>
        {/* 👇 reactions go HERE */}
        {Object.keys(grouped).length > 0 && (
          <MessageReactions grouped={grouped} react={react} />
        )}
        <div>
          <span style={{ cursor: "pointer", userSelect: "none" }} title={renderStatus(status).title}>{renderStatus(status).icon}</span>
        </div>
        {showPicker && (
          <EmojiPickerPopover onSelect={(emoji) => { react(emoji); setShowPicker(false); }} />
        )}
      </Bubble>
    </Row>
  );
};