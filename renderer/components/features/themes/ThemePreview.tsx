import { themes } from "../../../styles";
import { Theme } from "../../../styles/theme/type";

export const ThemePreview = ({ themeName }: { themeName: string }) => {
  const theme: Theme = themes[themeName];

  return (
    <div style={{ display: "flex", gap: 6 }}>
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: 3,
          background: theme.colors.background,
          border: `1px solid ${theme.colors.border}`,
        }}
      />
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: 3,
          background: theme.colors.textPrimary,
          border: `1px solid ${theme.colors.border}`,
        }}
      />
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: 3,
          background: theme.colors.accent,
          border: `1px solid ${theme.colors.border}`,
        }}
      />
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: 3,
          background: theme.colors.textSecondary,
          border: `1px solid ${theme.colors.border}`,
        }}
      />
      {theme.colors?.accent2 && (
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 3,
            background: theme.colors?.accent2,
            border: `1px solid ${theme.colors.border}`,
          }}
        />
      )}
      {theme.colors?.hover && (
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 3,
            background: theme.colors?.hover,
            border: `1px solid ${theme.colors.border}`,
          }}
        />
      )}
    </div>
  );
};