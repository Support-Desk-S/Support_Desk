import React from 'react';

const EmptyState = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    {icon && (
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-4 text-zinc-400">
        {icon}
      </div>
    )}
    <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
    {description && (
      <p className="text-sm text-zinc-400 max-w-xs mb-4">{description}</p>
    )}
    {action && action}
  </div>
);

export default EmptyState;
