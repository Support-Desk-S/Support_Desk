import React from 'react';

const variantClasses = {
  primary: 'bg-white text-black border border-white hover:bg-zinc-100 hover:shadow-[0_2px_12px_rgba(255,255,255,0.08)] active:scale-[0.98]',
  secondary: 'bg-[#09090b] text-zinc-200 border border-white/5 hover:bg-[#161619] hover:border-white/15 hover:text-white active:scale-[0.98] shadow-sm',
  ghost: 'bg-transparent text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent active:scale-[0.98]',
  danger: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/15 active:scale-[0.98]',
  outline: 'bg-transparent text-white border border-white/10 hover:bg-white/5 hover:border-white/20 active:scale-[0.98]',
};

const sizeClasses = {
  sm: 'px-3.5 py-1.5 text-xs font-semibold tracking-wide',
  md: 'px-4.5 py-2 text-sm font-semibold tracking-wide',
  lg: 'px-6 py-2.5 text-sm font-bold tracking-wide',
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
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
        disabled && !loading ? 'opacity-50 cursor-not-allowed' : '',
        loading ? 'opacity-70 cursor-default' : '',
        !disabled && !loading ? 'cursor-pointer' : '',
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
