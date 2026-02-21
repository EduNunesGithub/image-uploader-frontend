import { useTheme } from '@/hooks/use-theme';
import { twMerge } from 'tailwind-merge';

export const ProgressBar = () => {
  const { theme } = useTheme();

  return (
    <section
      className={twMerge(
        'border duration-200 ease-standard flex flex-col h-25 items-center justify-center max-w-120 p-2 rounded-lg shadow-[0_0.75rem_2rem_-1rem_#04071140] transition-all w-full',
        theme === 'dark'
          ? 'bg-[#212936] border-[#4D5562]'
          : 'bg-white border-[#E5E7EB]',
      )}
    >
      <p
        className={twMerge(
          'duration-200 ease-standard font-light mb-4 text-xs transition-all',
          theme === 'dark' ? 'text-[#F9FAFBCC]' : 'text-[#121826]',
        )}
      >
        <strong className="font-semibold">Uploading,</strong> please wait..
      </p>

      <div
        className={twMerge(
          'duration-200 ease-standard relative h-1.5 max-w-80 overflow-hidden rounded-full transition-all w-full',
          theme === 'dark' ? 'bg-[#4D5562]' : 'bg-[#E5E7EB]',
        )}
      >
        <div
          className="absolute bg-[#3662E3] inset-y-0 rounded-full w-13"
          style={{
            animation: 'progress 1.5s cubic-bezier(0.2, 0, 0, 1) infinite',
          }}
        />
        <div
          className="absolute bg-[#3662E3] inset-y-0 rounded-full w-13"
          style={{
            animation: 'progress 1.5s cubic-bezier(0.2, 0, 0, 1) infinite',
            animationDelay: '-0.75s',
          }}
        />
      </div>
    </section>
  );
};
