import React from 'react';

const variantClasses = {
  primary: 'bg-[#111111] text-white border border-[#111111] hover:bg-[#2d2d2d] hover:border-[#2d2d2d]',
  secondary: 'bg-white text-[#111111] border border-[#e5e7eb] hover:bg-[#f9fafb]',
  ghost: 'bg-transparent text-[#6b7280] hover:bg-[#f3f4f6] border border-transparent',
  danger: 'bg-[#ef4444] text-white border border-[#ef4444] hover:bg-[#dc2626]',
  outline: 'bg-transparent text-[#111111] border border-[#111111] hover:bg-[#f9fafb]',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-sm',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 font-medium rounded-[10px]',
        'transition-all duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
