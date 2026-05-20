import { api } from "../../../lib/api";

export const getNotifications = async (cursor?: string) => {
  const res = await api.get('/me/notifs');
  return res.data;
  // as {
  //   notifications: any[];
  //   nextCursor?: string;
  // };
}