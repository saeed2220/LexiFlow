import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900 border border-transparent shadow-xs',
  secondary:
    'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 border border-transparent',
  outline:
    'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100',
  ghost:
    'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200/70 border border-transparent',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-[40px] md:min-h-[36px] px-3.5 py-1.5 text-xs gap-1.5',
  md: 'min-h-[44px] md:min-h-[40px] px-4 py-2 text-sm gap-2',
  lg: 'min-h-[48px] px-5 py-2.5 text-sm gap-2',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center rounded-lg font-medium',
        'whitespace-nowrap shrink-0 transition-colors duration-150',
        'disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
};
