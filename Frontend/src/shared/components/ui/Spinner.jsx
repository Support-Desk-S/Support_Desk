import React from 'react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizeMap = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8', xl: 'h-12 w-12' };

  return (
    <svg
      className={`animate-spin text-[#111111] ${sizeMap[size]} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Loading"
    >
      <circle
        className="opacity-20"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
};

export const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#f8f9fa]">
    <div className="flex flex-col items-center gap-4">
      <Spinner size="lg" />
      <p className="text-sm text-[#6b7280]">Loading...</p>
    </div>
  </div>
);

export default Spinner;
