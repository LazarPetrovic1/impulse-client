import { useEffect } from "react";
import { ChatPage as ChatPageItem } from "../../components/features/chat";
import { setShortcutsLocked } from "../../features/system/shortcuts";
import { withChatLayout } from "./_layout";

function ChatPage() {
  useEffect(() => {
    setShortcutsLocked(true);
    return () => { setShortcutsLocked(false); };
  }, []);
  return <ChatPageItem chatId="" />
}

export default withChatLayout(ChatPage)