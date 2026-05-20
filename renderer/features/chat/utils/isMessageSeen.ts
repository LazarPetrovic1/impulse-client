export const isMessageSeen = (
  messageId: number,
  chatId: string,
  seenBy: Record<string, Record<string, string>>,
  currentUserId: string
) => {
  const chatSeen = seenBy[chatId] || {};
  return Object.entries(chatSeen).some(
    ([userId, lastSeenId]) => userId !== currentUserId && Number(lastSeenId) >= messageId
  );
};