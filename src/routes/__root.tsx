import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { twMerge } from 'tailwind-merge';
import { Header } from '@/components/header';
import { getOrInitTheme } from '@/server/theme';

import appCss from '../styles.css?url';

export const Route = createRootRoute({
  beforeLoad: async () => {
    const theme = await getOrInitTheme();
    return { theme };
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme } = Route.useRouteContext();

  return (
    <html className={theme} lang="en">
      <head>
        <HeadContent />
      </head>
      <body
        className={twMerge(
          'duration-200 ease-standard transition-all',
          theme === 'dark' ? 'bg-[#121826]' : 'bg-[#F9FAFB]',
        )}
      >
        <Header />
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
