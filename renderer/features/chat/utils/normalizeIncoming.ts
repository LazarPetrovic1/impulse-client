import { MessageStatus } from "../types";

export const normalizeIncoming = (payload: any) => ({
  ...payload,
  chatId: String(payload.chatId ?? payload?.chat?.id ?? payload.chat),
  senderId: payload.senderId ?? payload.sender,
  status: "sent" as MessageStatus,
});