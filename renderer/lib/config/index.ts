"use client"

export const config = {
  API_URL: typeof window === "undefined" ? process.env.NEXT_PUBLIC_MAIN_API_URL : window.env.api,
  WS_URL: typeof window === "undefined" ? process.env.NEXT_PUBLIC_WS_URL : window.env.sockets,
  CHAT_URL: typeof window === "undefined" ? process.env.NEXT_PUBLIC_CHATS_API_URL : window.env.chats,
};