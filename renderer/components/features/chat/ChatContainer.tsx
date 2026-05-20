import styled from "styled-components";
import { useFriendRequestStore } from "../../../features/friend";
import { SplitLayout } from "../../layout";
import { ChatSidebar } from "./ChatSidebar";

const RightPane = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChatContainer = ({ children }: { children: React.ReactNode }) => {
  const friendsMap = useFriendRequestStore((s) => s.friends);
  const friends = Object.values(friendsMap);
  const chats = friends.map((f) => ({ id: f.id, name: f.username }));

  return (
    <SplitLayout
      left={<ChatSidebar chats={chats} />}
      right={<RightPane>{children}</RightPane>}
    />
  );
};