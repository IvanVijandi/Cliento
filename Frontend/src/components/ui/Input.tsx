import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className = '', ...props }, ref) => {
    const inputStyles = `
      flex h-10 w-full rounded-md border border-gray-300 
      bg-white px-3 py-2 text-base
      file:border-0 file:bg-transparent file:text-sm file:font-medium
      placeholder:text-gray-400
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50
      ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}
      ${className}
    `;

    const width = fullWidth ? 'w-full' : '';

    return (
      <div className={`space-y-2 ${width}`}>
        {label && (
          <label className="text-sm font-medium text-gray-700" htmlFor={props.id}>
            {label}
          </label>
        )}
        <input ref={ref} className={inputStyles} {...props} />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;