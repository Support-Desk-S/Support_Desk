import React from 'react';

const EmptyState = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    {icon && (
      <div className="w-12 h-12 rounded-xl bg-[#f3f4f6] flex items-center justify-center mb-4 text-[#9ca3af]">
        {icon}
      </div>
    )}
    <h3 className="text-sm font-semibold text-[#111111] mb-1">{title}</h3>
    {description && (
      <p className="text-sm text-[#6b7280] max-w-xs mb-4">{description}</p>
    )}
    {action && action}
  </div>
);

export default EmptyState;
