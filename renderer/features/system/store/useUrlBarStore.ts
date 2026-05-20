// lib/store/useUrlBarStore.ts
import { create } from "zustand";
import { AlertType } from "../../../types";

interface UrlBarStore {
  url: string;
  setUrl: (url: string) => void;
  alerts: AlertType[];
}

export const useUrlBarStore = create<UrlBarStore>((set) => ({
  url: "/",
  setUrl: (url: string) => set({ url }),
  alerts: [],
}));