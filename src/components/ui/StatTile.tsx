import React from 'react';
import { Surface } from './Surface';

interface StatTileProps {
  label: string;
  value: string;
  unit?: string;
  hint: string;
  onClick?: () => void;
}

export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  unit,
  hint,
  onClick,
}) => {
  const content = (
    <div className="flex flex-col justify-between gap-2 text-start">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
          {value}
        </span>
        {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
      </div>
      <span className="text-xs text-slate-500 truncate">{hint}</span>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full text-start bg-white border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-slate-300 hover:bg-slate-50/50 transition-colors cursor-pointer"
      >
        {content}
      </button>
    );
  }

  return (
    <Surface padding="sm" className="sm:p-5">
      {content}
    </Surface>
  );
};
