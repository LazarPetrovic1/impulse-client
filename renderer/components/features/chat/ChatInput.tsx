// src/components/chat/ChatInput.tsx

import { useMemo, useRef, useState } from "react";
import { useTyping } from "../../../features/chat/hooks";
import styled from "styled-components";
import { useReplyStore } from "../../../features/chat/store";
import { Theme } from "../../../styles/theme/type";

const EMOJIS = ["😀", "😂", "😍", "🔥", "👍", "🙏", "🎉", "😎"];

const Bar = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme } : { theme: Theme }) => theme.colors.border};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const TextArea = styled.textarea`
  flex: 1;
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  border: none;
  outline: none;
  color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
  padding: 10px;
  border-radius: 8px;
  resize: none;
  min-height: 40px;
  max-height: 120px;
`;

const Button = styled.button`
  margin-left: 8px;
  background: #2d6cdf;
  border: none;
  color: white;
  padding: 0 14px;
  border-radius: 8px;
  cursor: pointer;
  height: 100%;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
`;

const ReplyPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #151515;
  border-left: 3px solid #2d6cdf;
  padding: 8px 10px;
  margin-bottom: 6px;
  border-radius: 6px;
  font-size: 13px;
  color: #ccc;

  .content {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 85%;
  }

  .close {
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    padding: 2px 6px;
    &:hover { color: #ff0000; }
  }
`;

const extractFirstLink = (value: string) => {
  const match = value.match(
    /(https?:\/\/[^\s]+)/g
  );
  return match?.[0] ?? null;
};

export const ChatInput = ({
  chatId,
  onSend,
}: {
  chatId: string;
  onSend: (chatId: string, content: string, msgId?: number) => void;
}) => {
  const [text, setText] = useState("");
  const linkPreview = useMemo(() => {
    return extractFirstLink(text);
  }, [text]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendTyping } = useTyping();
  const { replyingTo, clearReply } = useReplyStore();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!text.trim()) return;

    onSend(chatId, text, replyingTo?.id);
    setText(() => "");
    clearReply()

    setTimeout(() => {
      const el = document.querySelector('[data-chat-scroll]');
      if (el) el.scrollTop = el.scrollHeight;
    }, 0);
  };

  return (
    <Bar onSubmit={handleSubmit}>
      {/* 🔗 link preview */}
      {linkPreview && (
        <div style={{
          background: "#111",
          padding: 8,
          borderRadius: 6,
          marginBottom: 6,
          fontSize: 12,
          color: "#aaa"
        }}>Link detected: {linkPreview}</div>
      )}
      {replyingTo && (
        <ReplyPreview>
          <div className="content">
            Replying to:
            {replyingTo.content.length > 40 ? `${replyingTo.content.slice(40)}...` : replyingTo.content}
          </div>
          <button className="close" onClick={clearReply}>✕</button>
        </ReplyPreview>
      )}
      <Row>
        <TextArea
          ref={textareaRef}
          value={text}
          placeholder="Message..."
          onChange={(e) => {
            setText(e.target.value);
            sendTyping();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(e);
            }
          }}
        />

        <Button type="submit" className="px-4">
          <i className="fas fa-paper-plane" />
        </Button>
      </Row>

      {/* placeholder for emoji + tools */}
      <Toolbar>
        {EMOJIS.map((emoji) => (
          <span
            key={emoji}
            style={{ cursor: "pointer" }}
            onClick={() => {
              const el = textareaRef.current;
              if (!el) return;
              const start = el.selectionStart;
              const end = el.selectionEnd;
              const newText = text.slice(0, start) + emoji + text.slice(end);
              setText(newText);
              requestAnimationFrame(() => {
                el.focus();
                el.selectionStart = el.selectionEnd = start + emoji.length;
              });
            }}
          >{emoji}</span>
        ))}
      </Toolbar>
    </Bar>
  );
};