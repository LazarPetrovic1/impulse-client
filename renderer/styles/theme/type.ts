export type Theme = {
  colors: {
    background: string;
    textPrimary: string;
    textSecondary: string;
    border: string;

    accent: string;
    accent2?: string;
    hover: string;
  };
};

export type ThemeName = "contrast" | "jewel" | "mono" | "neon" | "pastel" | "terminal" | "warm" | "light" | "paper" | "midnight" | "forest" | "sunset" | "ocean";