import { useRouter } from "next/router";
import { usePaginatedMessages } from "../../../features/chat/hooks";
import { ChatContainer } from "./ChatContainer";
import { ChatPage } from "./ChatPage";

export const Chat = () => {
  const router = useRouter();
  const chatId = router.query.chatId as string | undefined;
  const query = usePaginatedMessages(chatId ?? "");
  if (!chatId) return <div>Invalid chat</div>;
  if (query.isLoading) return <div>Loading...</div>;
  return (
    <ChatContainer>
      <ChatPage chatId={chatId} />
    </ChatContainer>
  );
};