import { create } from "zustand";
import { Message } from "../types";

type ReplyState = {
  replyingTo: Message | null;
  setReply: (msg: Message) => void;
  clearReply: () => void;
};

export const useReplyStore = create<ReplyState>((set) => ({
  replyingTo: null,
  setReply: (msg) => set({ replyingTo: msg }),
  clearReply: () => set({ replyingTo: null }),
}));