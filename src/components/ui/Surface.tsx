import React from 'react';

interface SurfaceProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: 'div' | 'section' | 'article';
}

const PADDING_MAP = {
  none: '',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
};

/**
 * Single-elevation flat card surface with 1px hairline border.
 * Avoids heavy shadows and nested card-within-card framing.
 */
export const Surface: React.FC<SurfaceProps> = ({
  children,
  className = '',
  padding = 'md',
  as: Component = 'div',
}) => {
  return (
    <Component
      className={[
        'bg-white border border-slate-200 rounded-xl',
        PADDING_MAP[padding],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Component>
  );
};
