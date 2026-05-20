import { useRouter } from "next/router";
import { ChatPage } from "../../components/features/chat";
import { withChatLayout } from "./_layout";
import { useEffect } from "react";
import { setShortcutsLocked } from "../../features/system/shortcuts";

function ChatWithId() {
  const router = useRouter();
  const chatId = router.query.chatId as string;
  useEffect(() => {
    setShortcutsLocked(true);
    return () => { setShortcutsLocked(false); };
  }, []);
  if (!chatId) return null;
  return <ChatPage chatId={chatId} />;
}

export default withChatLayout(ChatWithId);