import React from 'react';

interface LoadingSkeletonProps {
  rows?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  rows = 3,
  className = '',
}) => {
  return (
    <div className={['space-y-3', className].filter(Boolean).join(' ')} aria-busy="true">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-10 w-full rounded-lg bg-slate-100 animate-pulse"
        />
      ))}
    </div>
  );
};
