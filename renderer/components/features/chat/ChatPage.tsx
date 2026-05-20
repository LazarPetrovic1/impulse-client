// src/components/chat/ChatPage.tsx

import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { useChatSocket, useSendMessage, usePaginatedMessages } from "../../../features/chat/hooks";
import { useChatStore } from "../../../features/chat/store";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Spinner } from "../../common";
import { isNearBottom } from "../../../features/chat/utils";
import { Message } from "../../../features/chat/types";
import { useTranslation } from "react-i18next";

const EMPTY: Message[] = [];

export const ChatPage = ({ chatId }: { chatId: string }) => {
  const chatIds = useMemo(() => (chatId ? [chatId] : []), [chatId]);
  useChatSocket(chatIds);
  const { handleSend } = useSendMessage();
  const messages = useChatStore((s) => chatId ? s.messages[chatId] ?? EMPTY : EMPTY);
  const reconcileBulk = useChatStore((s) => s.reconcileBulk);
  const { data, fetchNextPage, hasNextPage, isLoading } = usePaginatedMessages(chatId);
  const hydratedRef = useRef<Record<string, boolean>>({});
  const shouldAutoScrollRef = useRef(true);
  const { t } = useTranslation();
  useEffect(() => {
    if (!chatId || !data) return;
    if (hydratedRef.current[chatId]) return;
    const allMsgs = data.pages.flatMap((p) => p.messages);
    reconcileBulk(chatId, allMsgs);
    hydratedRef.current[chatId] = true;
  }, [data, chatId, reconcileBulk]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    // 👇 near top = load older messages
    if (el.scrollTop < 100 && hasNextPage && !isLoading) fetchNextPage();
    shouldAutoScrollRef.current = isNearBottom(el)
  };

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const prevHeight = el.scrollHeight;
    requestAnimationFrame(() => {
      const newHeight = el.scrollHeight;
      el.scrollTop += newHeight - prevHeight;
    });
  }, [messages.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (shouldAutoScrollRef.current) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  if (!chatId) return <h1>{t("chats.select")}</h1>;
  if (isLoading && messages.length === 0) return <Spinner />;
  return (
    <div
      ref={scrollRef}
      data-chat-scroll
      onScroll={handleScroll}
      style={{
        height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MessageList chatId={chatId} messages={messages} />
      <ChatInput chatId={chatId} onSend={handleSend} />
      {isLoading && <div style={{ textAlign: "center" }}><Spinner /></div>}
    </div>
  );
};