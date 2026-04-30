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
          className="text-sm font-medium text-[#111111]"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-[#6b7280] text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'w-full h-10 px-3 py-2 text-sm text-[#111111] bg-white',
            'border rounded-[10px] transition-all duration-150',
            'placeholder:text-[#9ca3af]',
            error
              ? 'border-[#ef4444] focus:border-[#ef4444]'
              : 'border-[#e5e7eb] focus:border-[#111111]',
            'focus:outline-none',
            prefix ? 'pl-9' : '',
            suffix ? 'pr-9' : '',
            className,
          ].join(' ')}
          {...rest}
        />
        {suffix && (
          <span className="absolute right-3 text-[#6b7280] text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>

      {error && (
        <p className="text-xs text-[#ef4444]">{error}</p>
      )}
      {hint && !error && (
        <p className="text-xs text-[#6b7280]">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
