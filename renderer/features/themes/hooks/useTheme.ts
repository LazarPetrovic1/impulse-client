import { useThemeStore } from '../store/themesStore';

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore();

  // useEffect(() => {
  //   const saved = localStorage.getItem('app-theme');
  //   if (saved) {
  //     setTheme(saved as any);
  //   }
  // }, []);

  return {
    theme,
    setTheme,
  };
};