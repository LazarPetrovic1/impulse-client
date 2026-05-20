import { getMessages } from "../api";

export const handleReconnect = async ({ chatIds, stores }: any) => {
  const { reconcileBulk } = stores;
  for (const id of chatIds) {
    try {
      const res = await getMessages(id);
      reconcileBulk(id, res.messages);
    } catch (err) {
      console.error("Backfill failed for chat", id, err);
    }
  }
};
