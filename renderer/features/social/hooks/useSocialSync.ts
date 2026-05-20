import { useEffect } from "react";
import { useSocialStore } from "../store/socialStore";

export const useSocialSync = () => {
  const clear = useSocialStore(state => state.clear);

  useEffect(() => {
    const handler = (e: StorageEvent) => { if (e.key === "logout") clear(); };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
};