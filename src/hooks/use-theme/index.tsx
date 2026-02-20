import { useRouter, useRouteContext } from '@tanstack/react-router';
import { setTheme as setThemeServer, type Theme } from '@/server/theme';

export const useTheme = () => {
  const router = useRouter();
  const { theme } = useRouteContext({ from: '__root__' });

  const setTheme = async (newTheme: Theme) => {
    await setThemeServer({ data: newTheme });
    router.invalidate();
  };

  const toggleTheme = async () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return { theme, setTheme, toggleTheme };
};
