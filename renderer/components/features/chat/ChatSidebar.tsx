// src/components/chat/ChatSidebar.tsx

import styled from "styled-components";
import { useRouter } from "next/router";
import { usePresenceStore } from "../../../features/chat/store";
import { api } from "../../../lib/api";
import { useAuthStore } from "../../../features/auth/store";
import { Theme } from "../../../styles/theme/type";
import { useGroupChats } from "../../../features/groups";
import { Spinner } from "../../common";
import { useTranslation } from "react-i18next";

const Sidebar = styled.div`
  height: 100%;
  background: #0e0e0e;
  border-right: 1px solid #222;
  overflow-y: auto;
`;

const Item = styled.button<{ $active?: boolean; $online?: boolean }>`
  border: none;
  outline: none;
  border-bottom: ${({ theme } : { theme: Theme }) => theme.colors.border};
  width: 100%;
  padding: 10px 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  background: ${({ $active }) => ($active ? "#1a1a1a" : "transparent")};

  &:hover {
    background: #161616;
  }

  &:active,
  &:focus { outline: none; }

  .name {
    color: white;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $online }) => ($online ? "#2ecc71" : "#555")};
  }
`;

type Chat = {
  id: number;
  name: string;
};

export const ChatSidebar = ({ chats }: { chats: Chat[]; }) => {
  const router = useRouter();
  const onlineUsers = usePresenceStore((s) => s.onlineUsers);
  const user = useAuthStore(s => s.user)
  const { data: groupChats, isLoading } = useGroupChats();
  const activeChatId = router.query.chatId ? parseInt(router.query.chatId as string) : null;
  const { t } = useTranslation()
  const openChat = async (friendId: number) => {
    const res = await api.post('/chats/direct', { userA: user.id, userB: friendId });
    const chat = res.data;
    router.push(`/chat/${chat.id}`);
  };

  return (
    <Sidebar>
      <h4>{t("chats.friends")}</h4>
      {chats.map((chat) => {
        const online = !!onlineUsers[chat.id];

        return (
          <Item
            type="button"
            key={chat.id}
            $active={chat.id === activeChatId}
            $online={online}
            onClick={() => openChat(chat.id)}
          >
            <span className="name">{chat.name}</span>
            <span className="dot" />
          </Item>
        );
      })}
      <h4>{t("chats.group")}</h4>
      {isLoading ? <Spinner /> : groupChats.map((chat: Chat) => {
        return (
          <Item
            type="button"
            key={chat.id}
            $active={chat.id === activeChatId}
            onClick={() => openChat(chat.id)}
          >
            <span className="name">{chat.name}</span>
          </Item>
        );
      })}
    </Sidebar>
  );
};