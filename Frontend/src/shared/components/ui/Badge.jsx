import React from 'react';

const variants = {
  open: 'bg-[#fef3c7] text-[#92400e]',
  assigned: 'bg-[#dbeafe] text-[#1e40af]',
  resolved: 'bg-[#d1fae5] text-[#065f46]',
  admin: 'bg-[#ede9fe] text-[#5b21b6]',
  agent: 'bg-[#e0f2fe] text-[#0369a1]',
  active: 'bg-[#d1fae5] text-[#065f46]',
  inactive: 'bg-[#f3f4f6] text-[#6b7280]',
  default: 'bg-[#f3f4f6] text-[#374151]',
  ai: 'bg-[#ede9fe] text-[#5b21b6]',
};

const Badge = ({ children, variant = 'default', className = '', dot = false }) => {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-xs font-medium uppercase tracking-wide',
        variants[variant] || variants.default,
        className,
      ].join(' ')}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current opacity-70"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
