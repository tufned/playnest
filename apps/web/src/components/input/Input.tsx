import React, { FC, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  extraStyles?: string;
  error?: FieldError;
}

const Input: FC<InputProps> = ({ label, placeholder, extraStyles, error, ...props }) => {
  return (
    <div className='flex-col py-2'>
      <span className='block pl-4'>{label}</span>
      <input
        className={`w-72 border border-primaryDimmed bg-transparent ${extraStyles} ${error ? 'border-alert' : ''}`}
        placeholder={placeholder}
        {...props}
      />
      {error && <div className='text-sm text-alert'>{error.message}</div>}
    </div>
  );
};

export default Input;
