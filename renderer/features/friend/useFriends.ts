import { useEffect } from "react";
import { useFriendRequestStore } from "./friendRequestStore";
import { api } from "../../lib/api";

export const useFriends = (userId: number) => {
  const setFriends = useFriendRequestStore((s) => s.setFriends);

  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      try {
        const res = await api(`/friend-requests/friends?userId=${userId}`);
        setFriends(res.data);
      } catch (e) {
        console.error("Failed to fetch friends", e);
      }
    };

    load();
  }, [userId]);
};