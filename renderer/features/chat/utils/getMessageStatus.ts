export const getMessageStatus = (
  messageId: string,
  seenMap: Record<string, string>
) => {
  const seenByAll = Object.values(seenMap).every((lastReadId) => lastReadId >= messageId);
  return seenByAll ? 'seen' : 'delivered';
};