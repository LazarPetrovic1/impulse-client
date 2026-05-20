export const handleUpdateEvent = ({ payload, stores }: any) => {
  const { reconcileMessage } = stores;
  reconcileMessage({
    ...payload,
    id: payload.id,
    chatId: String(payload.chatId ?? payload.chat?.id),
    content: payload.content,
    isEdited: true,
    status: "sent",
  });
}