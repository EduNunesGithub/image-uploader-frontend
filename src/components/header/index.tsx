import { Link } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';
import { useTheme } from '@/hooks/use-theme';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={twMerge(
        'border-b duration-200 ease-standard flex items-center justify-center px-6 py-4 transition-all w-full sm:px-8',
        theme === 'light' ? 'border-b-[#E5E7EB]' : 'border-b-[#212936]',
      )}
    >
      <div className="flex items-center justify-between max-w-page-container w-full">
        <Link className="flex h-fit w-fit" to="/">
          <img
            alt="Logo."
            className="h-6 object-contain w-auto"
            src={
              theme === 'dark' ? '/svg/logo-dark.svg' : '/svg/logo-light.svg'
            }
          />
        </Link>

        <button
          aria-label="Toggle theme."
          className={twMerge(
            'border duration-200 ease-standard flex h-10 items-center justify-center rounded-lg transition-all w-10',
            theme === 'dark'
              ? 'bg-[#364153] border-[#4D5562]'
              : 'bg-white border-[#E5E7EB]',
          )}
          onClick={toggleTheme}
        >
          <img
            alt=""
            className="h-6 object-contain w-6"
            src={theme === 'dark' ? '/svg/sun.svg' : '/svg/moon.svg'}
          />
        </button>
      </div>
    </header>
  );
};
