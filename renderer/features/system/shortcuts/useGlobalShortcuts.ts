import { useEffect } from "react";
import { isShortcutsLocked } from "./lock";

export const useGlobalShortcuts = (router, logout) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isShortcutsLocked()) return
      const ctrl = e.ctrlKey;
      const shift = e.shiftKey;

      const key = e.key.toLowerCase();

      // NAVIGATION
      if (ctrl && key === "1") router.push("/");
      if (ctrl && key === "2") router.push("/dashboard");
      if (ctrl && key === "3") router.push("/settings");
      if (ctrl && key === "4") router.push("/issues");
      if (ctrl && key === "5") router.push("/social");
      if (ctrl && key === "6") router.push("/chat");
      if (ctrl && key === "7") router.push("/videos-all");

      if (ctrl && key === "r") {
        e.preventDefault();
        router.refresh();
      }

      if (ctrl && key === "p") {
        e.preventDefault();
        window.dispatchEvent(new Event("open-command-palette"));
      }

      if (ctrl && e.key === "ArrowLeft") router.back();
      if (ctrl && e.key === "ArrowRight") router.forward();

      // AUTH
      if (shift && key === "x") logout();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router, logout]);
};