export const handleDeliveredEvent = ({ payload, stores }: any) => {
  const { updateDelivered } = stores;

  updateDelivered(
    payload.chatId,
    String(payload.userId),
    String(payload.messageId)
  );
};