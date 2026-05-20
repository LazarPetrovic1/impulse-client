// src/components/chat/MessageList.tsx

import { List } from "react-window";
import { MessageItem } from "./MessageItem";
import styled from "styled-components";
import { Message } from "../../../features/chat/types";
import { CSSProperties, useMemo } from "react";
import { useChatStore } from "../../../features/chat/store";

const ListWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

type RowProps = { data: Message[] }

const Row = ({ index, style, data }: { index: number; style: CSSProperties } & RowProps) => {
  const message = data[index];
  return (
    <div style={style} key={message.id ?? message.tempId}>
      <MessageItem message={message} key={message.id ?? message.tempId} />
    </div>
  );
};

export const MessageList = ({ messages, chatId }: { chatId: string; messages: Message[]; }) => {
  const typingUsers = useChatStore((s) => s.typing[chatId] ?? null);
  const stableMessages = useMemo(() => messages, [messages]);
  const typingNames = typingUsers ? Object.values(typingUsers).filter((u) => u.isTyping).map((u) => u.username) : [];
  return (
    <>
      <ListWrapper>
        <List<RowProps>
          style={{ height: '500px', width: "100%", overflow: 'auto' }}
          rowCount={messages.length}
          rowHeight={90}
          rowComponent={Row}
          rowProps={{ data: stableMessages }}
        />
      </ListWrapper>
      
        {typingNames.length > 0 && (
          <div className="text-center text-primary">
            {typingNames.length === 1
              ? `${typingNames[0]} is typing...`
              : `${typingNames.join(", ")} are typing...`}
          </div>
        )}
    </>
  );
};