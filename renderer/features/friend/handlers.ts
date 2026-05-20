import { api } from "../../lib/api";
import { play } from "../alerts";

export const handleRejected = ({ payload, userId, stores }: any) => {
  const { markOutgoing, reject, addAlert } = stores;
  // rejectee (initial sender of req), do nothing
  if (payload.senderId === userId) {}
  else {
    // rejector (initial target of req)
    markOutgoing(payload.senderId);
    reject(payload.senderId);
    addAlert({ id: crypto.randomUUID(), message: "Good riddance 👋", type: "info" });
    play(`/sound-effects/alerts/alert-spawn.mp3`);
  }
};

export const handleReconnect = async ({ userId, stores }: any) => {
  try {
    const { hydrate } = stores;
    const res = await api(`/friend-requests/incoming?userId=${userId}`);
    hydrate(res.data);
  } catch (err) {
    console.error('Friend request backfill failed', err);
  }
};

export const handleAccepted = ({ payload, userId, stores }: any) => {
  const { markOutgoing, accept, addAlert } = stores;
  if (payload.senderId === userId) {
    markOutgoing(payload.receiverId);
    accept(payload.receiverId);
    addAlert({ id: crypto.randomUUID(), message: "Your request has been accepted ☺️", type: "info" });
    play(`/sound-effects/alerts/alert-spawn.mp3`);
  } else {
    markOutgoing(payload.senderId);
    accept(payload.senderId);
    addAlert({ id: crypto.randomUUID(), message: "You two are now buddies ☺️", type: "info" });
    play(`/sound-effects/alerts/alert-spawn.mp3`);
  }
}

export const handleIncoming = ({ notif, userId, stores }: any) => {
  const { addIncoming, markOutgoing, addAlert, addNotification } = stores;
  if (notif.actor.id === userId) {
    addAlert({ id: crypto.randomUUID(), message: "Friend request sent", type: "info" });
    play(`/sound-effects/alerts/alert-spawn.mp3`);
    markOutgoing(notif.user.id);
  }
  else {
    addNotification(notif);
    addIncoming({
      id: notif.id,
      senderId: notif.senderId,
      receiverId: notif.receiverId,
      actingUser: notif.actingUser,
      status: 'pending' as const,
    });
    markOutgoing(notif.actor.id);
    addAlert({ id: crypto.randomUUID(), message: notif.body, type: "info" });
    play(`/sound-effects/alerts/alert-spawn.mp3`);
  }
}