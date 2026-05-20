import { create } from "zustand";
import { getProfile, getUserById, updateProfile } from "../api";
import { User } from "../../auth/store";

export interface SocialLinks {
  youtube?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export interface Profile {
  employment?: string;
  website?: string;
  social?: SocialLinks;
}

export interface ProfileState {
  loading: boolean;
  user: User | null;
  hidden: string[];
  profile: Profile | null;
  fetchProfile: (userId: number) => Promise<void>;
  fetchUser: (id: number) => Promise<void>;
  updateField: (id: number, field: string, value: any) => Promise<void>;
  toggleHidden: (field: string) => void;
  setHidden: (hidden: string[]) => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  loading: false,
  user: null,
  hidden: [],
  profile: null,

  fetchProfile: async (userId) => {
    try {
      set({ loading: true });
      const res = await getProfile(userId);
      const { website, employment, social } = res;
      set({ profile: { website, employment, social }, loading: false });
    } catch (err) {
      set({ profile: null, loading: false });
    }
  },

  fetchUser: async (id) => {
    set({ loading: true });
    const user = await getUserById(id);
    set({ user, hidden: user?.userOptions?.hidden ?? [], loading: false });
  },

  updateField: async (id, field, value) => {
    const updated = await updateProfile({ id, [field]: value });
    set((state) => ({ user: { ...state.user, ...updated } }));
  },

  toggleHidden: (field) => {
    const hidden = get().hidden;

    if (hidden.includes(field)) {
      set({ hidden: hidden.filter((f) => f !== field) });
    } else {
      set({ hidden: [...hidden, field] });
    }
  },

  setHidden: (hidden) => set({ hidden }),
}));