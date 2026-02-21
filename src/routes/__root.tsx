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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        <HeadContent />
      </head>
      <body
        className={twMerge(
          'auto-rows-min duration-200 grid grid-cols-1 grid-rows-[auto_1fr] ease-standard min-h-dvh transition-all w-full',
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
