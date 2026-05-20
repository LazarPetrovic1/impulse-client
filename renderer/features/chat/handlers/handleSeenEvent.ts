export const handleSeenEvent = ({ payload, stores }: any) => {
  const { updateSeen } = stores;
  console.log("PAYLOAD", payload);
  updateSeen(payload.chatId, String(payload.userId), String(payload.lastReadMessageId));
}