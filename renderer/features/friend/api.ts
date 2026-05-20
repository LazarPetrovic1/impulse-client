import { FriendRequestResponse, SendFriendRequestPayload } from ".";
import { api } from "../../lib/api";

export const sendFriendRequestApi = async (
  payload: SendFriendRequestPayload
): Promise<FriendRequestResponse> => {
  const res = await api.post(`/notifs/friend-request`, payload);
  return res.data;
};