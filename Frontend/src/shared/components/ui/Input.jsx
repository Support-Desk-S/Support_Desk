import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  hint,
  id,
  className = '',
  containerClass = '',
  prefix,
  suffix,
  ...rest
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).slice(2)}`;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClass}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3.5 text-zinc-500 text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'w-full h-10 px-3.5 py-2 text-sm text-white bg-[#09090b]',
            'border rounded-[10px] transition-all duration-200',
            'placeholder:text-zinc-600',
            error
              ? 'border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/20'
              : 'border-white/5 focus:border-white/20 focus:ring-1 focus:ring-white/5 focus:bg-[#0c0c0e]',
            'focus:outline-none shadow-inner',
            prefix ? 'pl-10' : '',
            suffix ? 'pr-10' : '',
            className,
          ].join(' ')}
          {...rest}
        />
        {suffix && (
          <span className="absolute right-3.5 text-zinc-500 text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-red-400/90 font-medium mt-0.5">{error}</p>
      )}
      {hint && !error && (
        <p className="text-[11px] text-zinc-500 mt-0.5">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
