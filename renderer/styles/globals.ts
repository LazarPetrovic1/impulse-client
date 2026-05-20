import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme/type';

export const GlobalStyles = createGlobalStyle<{
  $font: string;
  $fontSize: number;
}>`
  ::selection { background-color: yellow; color: black; }
  html { font-size: ${({ $fontSize }) => $fontSize}px; }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #__next {
    height: 100%;
  }

  body {
    background: ${({ theme } : { theme: Theme }) => theme.colors.background};
    color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
    font-family: ${({ $font }) =>
      $font && $font !== 'System'
        ? `'${$font}', sans-serif`
        : `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`};

    transition: background 0.2s ease, color 0.2s ease;
  }

  ::-webkit-scrollbar { width: 8px; }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme } : { theme: Theme }) => theme.colors.border};
    border-radius: 4px;
  }
`;