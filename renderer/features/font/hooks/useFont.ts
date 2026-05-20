// hooks/useFont.ts
import { useEffect } from 'react';
import { useFontStore } from '../store/fontStore';

export const useFont = () => {
  const { fonts, font, fontSize, hydrated, fontsLoaded, init, setFont, setFontSize } = useFontStore();
  useEffect(() => { if (!fontsLoaded) init(); }, [fontsLoaded, init]);

  return {
    fonts,
    font,
    fontSize,
    hydrated,
    fontsLoaded,
    setFont,
    setFontSize,
  };
};