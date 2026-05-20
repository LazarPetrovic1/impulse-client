import { useEffect, useMemo, useState } from "react";
import { commandRegistry, searchCommands, useCommandNavigation } from "../../lib/commands";
import { Modal } from "./Modal";
import { useRecentCommands } from "../../features/system/store";
import { useTranslation } from "react-i18next";

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { recent, add } = useRecentCommands();
  const { t } = useTranslation();
  const results = useMemo(() => {
    const searched = searchCommands(query);
    if (!query) {
      const all = commandRegistry.getAll();
      const recentItems = recent.map((id) => all.find((c) => c.id === id)).filter(Boolean);
      const others = all.filter((c) => !recent.includes(c.id));
      return [...recentItems, ...others];
    }
    return searched;
  }, [query, recent]);

  const { activeIndex, activeItem } = useCommandNavigation(results);
  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("open-command-palette", openHandler);
    return () => { window.removeEventListener("open-command-palette", openHandler); }
  }, []);

  // ENTER HANDLER
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && activeItem) {
        activeItem.action();
        add(activeItem.id);
        setOpen(false);
        setQuery("");
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => { window.removeEventListener("keydown", handler); }
  }, [activeItem]);

  return (
    <Modal
      title={t("modals.cmd")}
      show={open}
      onClose={() => setOpen(false)}
      provideOwnClosure
      style={{ backgroundColor: "#111", width: "520px" }}
    >
      <>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("modals.searchcmd")}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {results.map((cmd, index) => (
            <div
              key={cmd.id}
              onClick={() => {
                cmd.action();
                add(cmd.id);
                setOpen(false);
                setQuery("");
              }}
              style={{
                padding: "8px",
                cursor: "pointer",
                border: "1px solid #333",
                borderRadius: 4,
                background: index === activeIndex ? "#2a2a2a" : "transparent",
              }}
            >
              <div>{cmd.label}</div>
              <small style={{ opacity: 0.6 }}>{cmd.group}</small>
            </div>
          ))}
        </div>
      </>
    </Modal>
  );
};