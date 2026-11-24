import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4 sm:px-6">
      <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1.5 text-balance">
        {title}
      </h3>
      <p className="text-sm text-slate-500 max-w-md leading-relaxed mb-5">
        {description}
      </p>
      {(actionLabel && onAction) || (secondaryLabel && onSecondaryAction) ? (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {actionLabel && onAction && (
            <Button variant="primary" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          {secondaryLabel && onSecondaryAction && (
            <Button variant="outline" size="sm" onClick={onSecondaryAction}>
              {secondaryLabel}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};
