import React from 'react';

interface MixedTextProps {
  children: React.ReactNode;
  script: 'en' | 'fa' | 'ipa';
  className?: string;
  as?: 'span' | 'p' | 'div';
}

/**
 * Isolates bidirectional English, Persian, and IPA phonetic segments so
 * mixed-language typography renders cleanly in both LTR and RTL modes.
 */
export const MixedText: React.FC<MixedTextProps> = ({
  children,
  script,
  className = '',
  as: Component = 'span',
}) => {
  if (script === 'fa') {
    return (
      <Component
        dir="rtl"
        lang="fa"
        className={['font-fa', className].filter(Boolean).join(' ')}
      >
        {children}
      </Component>
    );
  }

  if (script === 'ipa') {
    return (
      <Component
        dir="ltr"
        lang="en"
        className={['font-mono text-slate-500 tabular-nums', className]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      dir="ltr"
      lang="en"
      className={['font-en', className].filter(Boolean).join(' ')}
    >
      {children}
    </Component>
  );
};
