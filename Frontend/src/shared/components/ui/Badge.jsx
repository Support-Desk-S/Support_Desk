import React from 'react';

const variants = {
  open: 'bg-amber-500/5 text-amber-400 border border-amber-500/10 shadow-[0_0_8px_rgba(245,158,11,0.03)]',
  assigned: 'bg-blue-500/5 text-blue-400 border border-blue-500/10 shadow-[0_0_8px_rgba(59,130,246,0.03)]',
  resolved: 'bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 shadow-[0_0_8px_rgba(16,185,129,0.03)]',
  admin: 'bg-indigo-500/5 text-indigo-400 border border-indigo-500/10',
  agent: 'bg-sky-500/5 text-sky-400 border border-sky-500/10',
  active: 'bg-emerald-500/5 text-emerald-400 border border-emerald-500/10',
  inactive: 'bg-zinc-500/5 text-zinc-400 border border-zinc-500/10',
  default: 'bg-zinc-500/5 text-zinc-400 border border-zinc-500/10',
  ai: 'bg-purple-500/5 text-purple-400 border border-purple-500/10 shadow-[0_0_8px_rgba(167,139,250,0.03)]',
};

const Badge = ({ children, variant = 'default', className = '', dot = false }) => {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider',
        variants[variant] || variants.default,
        className,
      ].join(' ')}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current animate-pulse opacity-85"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
