export const handleReactionEvent = ({ payload, stores }: any) => {
  const { updateMessage, setReactions } = stores;
  updateMessage({ ...payload, id: payload.messageId, status: "sent" });
  // messageId: number, reactions: Reaction[], chatId: string
  setReactions(payload.messageId, payload.reactions, payload.chatId)
}