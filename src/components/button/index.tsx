import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  LucideIcon?: LucideIcon;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  LucideIcon,
  ...props
}) => (
  <button
    {...props}
    className={twMerge(
      'bg-[#3662E3] duration-200 ease-standard flex font-semibold gap-1 items-center max-w-full px-3 py-2 rounded-md text-xs text-[#F9FAFB] transition-all w-fit',
      'hover:brightness-75',
      className,
    )}
  >
    {LucideIcon && <LucideIcon className="h-3 w-3" />}
    {children}
  </button>
);
