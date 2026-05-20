import { useEffect, useState } from "react";

export const useCommandNavigation = (items: any[]) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [items]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!items.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, items.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [items]);

  return {
    activeIndex,
    setActiveIndex,
    activeItem: items[activeIndex],
  };
};