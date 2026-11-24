import React from 'react';

interface PageHeaderProps {
  breadcrumb: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumb,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-6 border-b border-slate-200">
      <div className="space-y-1.5 min-w-0">
        <p className="text-xs font-medium text-slate-500 truncate">{breadcrumb}</p>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 text-balance">
          {title}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
};
