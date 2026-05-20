// stores/friendRequestStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../auth/store';

export interface FriendRequest {
  id: number;
  senderId: number;
  receiverId: number;
  actingUser: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface State {
  incoming: Record<number, FriendRequest>;
  outgoing: Record<number, boolean>; // receiverId -> sent
  friends: Record<number, User>;
  addIncoming: (req: FriendRequest) => void;
  markOutgoing: (receiverId: number) => void;

  accept: (id: number) => void;
  reject: (id: number) => void;

  hydrate: (reqs: FriendRequest[]) => void;
  setFriends: (reqs: User[]) => void;
}

export const useFriendRequestStore = create<State>()(
  persist(
    (set) => ({
      incoming: {},
      outgoing: {},
      friends: {},

      accept: (id) =>
        set((s) => {
          const r = s.incoming[id];
          if (!r) return s;
          return {
            incoming: {
              ...s.incoming,
              [id]: { ...r, status: 'accepted' },
            },
          };
        }),
  
      reject: (id) =>
        set((s) => {
          const r = s.incoming[id];
          if (!r) return s;
          return {
            incoming: {
              ...s.incoming,
              [id]: { ...r, status: 'rejected' },
            },
          };
        }),

      addIncoming: (req) => set((s) => ({ incoming: { ...s.incoming, [req.id]: req } })),
      markOutgoing: (receiverId) => set((s) => ({ outgoing: { ...s.outgoing, [receiverId]: true } })),
      hydrate: (reqs) => set(() => ({ incoming: Object.fromEntries(reqs.map((r) => [r.id, r])) })),
      setFriends: (fr) => set(() => ({ friends: Object.fromEntries(fr.map((f) => [f.id, f])) })),
    }), { name: 'friend-state' }
  )
);