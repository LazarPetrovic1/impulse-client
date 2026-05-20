// chat.handlers.ts
type HandleTypingArgs = {
  chatId: string;
  userId: number;
  isTyping: boolean;
  setTyping: (chatId: string, userId: number, username: string, value: boolean) => void;
  clearTyping: (chatId: string, userId: number) => void;
  typingTimeouts: Record<string, NodeJS.Timeout>;
  username: string;
};

export const handleTypingEvent = ({
  chatId,
  userId,
  isTyping,
  setTyping,
  clearTyping,
  typingTimeouts,
  username
}: HandleTypingArgs) => {
  if (isTyping) {
    setTyping(chatId, userId, username, true);

    if (typingTimeouts[`${chatId}:${userId}`]) {
      clearTimeout(typingTimeouts[`${chatId}:${userId}`]);
    }

    typingTimeouts[`${chatId}:${userId}`] = setTimeout(() => {
      clearTyping(chatId, userId);
    }, 1500);

    return;
  }

  clearTyping(chatId, userId);
};