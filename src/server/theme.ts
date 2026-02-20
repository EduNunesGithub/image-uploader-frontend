import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { z } from 'zod';

export type Theme = z.infer<typeof ThemeSchema>;

export const DEFAULT_THEME: Theme = 'dark';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
export const THEME_COOKIE = 'theme';

export const ThemeSchema = z.enum(['light', 'dark']);

export const getOrInitTheme = createServerFn({ method: 'GET' }).handler(
  (): Theme => {
    const stored = ThemeSchema.safeParse(getCookie(THEME_COOKIE)).data;

    if (!stored) {
      setCookie(THEME_COOKIE, DEFAULT_THEME, {
        path: '/',
        maxAge: COOKIE_MAX_AGE,
        sameSite: 'lax',
      });
      return DEFAULT_THEME;
    }

    return stored;
  },
);

export const setTheme = createServerFn({ method: 'POST' })
  .inputValidator(ThemeSchema)
  .handler(({ data: theme }) => {
    setCookie(THEME_COOKIE, theme, {
      path: '/',
      maxAge: COOKIE_MAX_AGE,
      sameSite: 'lax',
    });
    return theme;
  });
