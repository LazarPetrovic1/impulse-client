import { Theme, ThemeName } from '../type';
import { contrastTheme } from './contrast';
import { forestTheme } from './forest';
import { jewelTheme } from './jewel';
import { lightTheme } from './light';
import { midnightTheme } from './midnight';
import { monoTheme } from './mono';
import { neonTheme } from './neon';
import { oceanTheme } from './ocean';
import { paperTheme } from './paper';
import { pastelTheme } from './pastel';
import { sunsetTheme } from './sunset';
import { terminalTheme } from './terminal';
import { warmTheme } from './warm';

export * from './mono';
export * from './neon';
export * from './terminal';
export * from './warm';
export * from './pastel';
export * from './jewel';
export * from './contrast';

export const themes: Record<ThemeName, Theme> = {
  contrast: contrastTheme,
  light: lightTheme,
  jewel: jewelTheme,
  mono: monoTheme,
  neon: neonTheme,
  pastel: pastelTheme,
  terminal: terminalTheme,
  warm: warmTheme,
  paper: paperTheme,
  midnight: midnightTheme,
  forest: forestTheme,
  sunset: sunsetTheme,
  ocean: oceanTheme
};