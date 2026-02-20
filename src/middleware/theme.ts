import { createMiddleware } from '@tanstack/react-start';
import {
  getRequestHeader,
  setResponseHeaders,
} from '@tanstack/react-start/server';
import { DEFAULT_THEME, THEME_COOKIE, ThemeSchema } from '@/server/theme';

export const themeMiddleware = createMiddleware().server(async ({ next }) => {
  const cookieHeader = getRequestHeader('cookie') ?? '';
  const raw = cookieHeader
    .split(';')
    .map((c) => c.trim().split('='))
    .find(([key]) => key === THEME_COOKIE)?.[1];
  const stored = ThemeSchema.safeParse(raw).data;

  if (!stored)
    setResponseHeaders(
      new Headers({
        'Set-Cookie': `${THEME_COOKIE}=${DEFAULT_THEME}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`,
      }),
    );

  return next();
});
