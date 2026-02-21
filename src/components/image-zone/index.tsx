import React from 'react';
import { Download, Link } from 'lucide-react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/button';
import { useTheme } from '@/hooks/use-theme';

export type ImageZoneProps = {
  image: Image;
};

export const ImageZone: React.FC<ImageZoneProps> = ({ image }) => {
  const { theme } = useTheme();

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast('Link copied to clipboard.');
  };

  const handleDownload = async () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/api/images/${image.id}?download`,
      '_blank',
    );
  };

  return (
    <section className="flex flex-col items-center justify-center w-full">
      <div
        aria-label="Image container."
        className={twMerge(
          'border cursor-pointer duration-200 ease-standard flex flex-col h-80 max-w-135 mb-6 p-2 relative rounded-lg shadow-[0_0.75rem_2rem_-1rem_#04071140] transition-all w-full z-0',
          theme === 'dark'
            ? 'bg-[#212936] border-[#4D5562]'
            : 'bg-white border-[#E5E7EB]',
        )}
      >
        <img
          alt="Shared image."
          className="flex-1 h-full object-contain rounded-lg w-full"
          src={image.url}
        />

        <div
          className={twMerge(
            'absolute backdrop-blur-3xl flex h-[calc(100%-1rem)] left-2 overflow-hidden rounded-lg top-2 w-[calc(100%-1rem)] -z-10',
            theme === 'dark' ? 'bg-[#21293680]' : 'bg-white/50',
          )}
        />
        <img
          alt=""
          aria-hidden
          className="absolute h-[calc(100%-1rem)] left-2 rounded-lg top-2 w-[calc(100%-1rem)] -z-20"
          src={image.url}
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-center w-full">
        <Button LucideIcon={Link} onClick={handleShare}>
          Share
        </Button>
        <Button LucideIcon={Download} onClick={handleDownload}>
          Download
        </Button>
      </div>
    </section>
  );
};
