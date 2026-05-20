import { useTranslation } from "react-i18next";
import { useThemeStore } from "../../../features/themes";
import { ThemePreview } from "./ThemePreview";
import { themes } from "../../../styles";
import { useState } from "react";
import { Modal } from "../../common";

// const THEME_OPTIONS = [
//   { value: 'light', label: 'theme.light' },
//   { value: 'paper', label: 'theme.paper' },
//   { value: 'contrast', label: 'theme.contrast' },
//   { value: 'mono', label: 'theme.mono' },
//   { value: 'terminal', label: 'theme.terminal' },
//   { value: 'jewel', label: 'theme.jewel' },
//   { value: 'neon', label: 'theme.neon' },
//   { value: 'pastel', label: 'theme.pastel' },
//   { value: 'warm', label: 'theme.warm' },
//   { value: 'midnight', label: 'theme.midnight' },
//   { value: 'ocean', label: 'theme.ocean' },
//   { value: 'sunset', label: 'theme.sunset' },
//   { value: 'forest', label: 'theme.forest' },
// ];

export const ThemeSwitcher = ({ notext } : { notext?: boolean }) => {
  const { theme, setTheme } = useThemeStore();
  const { t } = useTranslation();
  const themeNames = Object.keys(themes);
  const [open, setOpen] = useState(false);
  return (
    <div
      className="d-flex justify-content-between align-items-center"
      style={{ flex: 1 }}
    >
      {!notext && <div>{t("theme.switch")}</div>}
      <button
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => { if (e.key === "Enter") setOpen(v => !v) }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0.3rem 0.6rem",
          opacity: open ? 0 : 1,
          transform: open ? "translateY(-5px)" : "translateY(0)",
          transition: "all 0.15s ease",
        }}
      >
        <ThemePreview themeName={theme} />
        <span>{t(`theme.${theme}`)}</span>
      </button>

      {/* Dropdown */}
      <Modal title={t("theme.switch")} show={open} onClose={() => setOpen(false)} provideOwnClosure style={{ backgroundColor: "#111" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {themeNames.map((name) => (
            <div
              key={name}
              onClick={() => { setTheme(name as any); setOpen(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                cursor: "pointer",
                borderRadius: 6,
                border: "1px solid #333",
                // background: theme === name ? "#222" : "#111",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#222")}
              onMouseLeave={(e) => (e.currentTarget.style.background = theme === name ? "#222" : "#111")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ThemePreview themeName={name} />
                <span style={{ color: "white" }}>{t(`theme.${name}`)}</span>
              </div>

              {theme === name && (
                <span style={{ color: "#4caf50", fontWeight: "bold" }}>✓</span>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};