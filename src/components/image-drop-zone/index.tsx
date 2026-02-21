import { useMutation } from '@tanstack/react-query';
import Dropzone from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import { ProgressBar } from '@/components/progress-bar';
import { useTheme } from '@/hooks/use-theme';
import { uploadImage } from '@/server/image';

export const ImageDropZone = () => {
  const { theme } = useTheme();

  const { mutate, status } = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return uploadImage({ data: formData });
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    const [file] = acceptedFiles;
    if (file) mutate(file);
  };

  if (status === 'pending') return <ProgressBar />;
  else
    return (
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section
            className={twMerge(
              'border cursor-pointer duration-200 ease-standard flex max-w-135 min-h-80 p-2 rounded-lg shadow-[0_0.75rem_2rem_-1rem_#04071140] transition-all w-full',
              theme === 'dark'
                ? 'bg-[#212936] border-[#4D5562]'
                : 'bg-white border-[#E5E7EB]',
            )}
            {...getRootProps()}
          >
            <div
              className={twMerge(
                'border border-dashed duration-200 ease-standard flex flex-col items-center justify-center rounded-lg transition-all w-full',
                theme === 'dark' ? 'border-[#4D5562]' : 'border-[#E5E7EB]',
              )}
            >
              <input {...getInputProps()} />
              <img
                alt=""
                className="h-8 mb-5 object-contain w-8"
                src="/svg/exit.svg"
              />
              <p
                className={twMerge(
                  'duration-200 ease-standard font-medium mb-2 text-sm transition-all',
                  theme === 'dark' ? 'text-[#F9FAFBCC]' : 'text-[#121826]',
                )}
              >
                Drag & drop a file or{' '}
                <span
                  className={twMerge(
                    'duration-200 ease-standard transition-all',
                    theme === 'dark' ? 'text-[#F9FAFBCC]' : 'text-[#3662E3]',
                  )}
                >
                  browse files
                </span>
              </p>
              <p
                className={twMerge(
                  'duration-200 ease-standard font-light text-xs transition-all',
                  theme === 'dark' ? 'text-[#F9FAFBCC]' : 'text-[#121826]',
                )}
              >
                JPG, PNG or GIF - Max file size 2MB
              </p>
            </div>
          </section>
        )}
      </Dropzone>
    );
};
