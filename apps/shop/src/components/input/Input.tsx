import React, { FC, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  extraStyles?: string;
  error?: FieldError;
  disabled?: boolean;
}

const Input: FC<InputProps> = ({
  label,
  placeholder,
  extraStyles,
  error,
  disabled = false,
  ...props
}) => {
  return (
    <div className="flex-col py-1 w-full">
      <span className="block pl-4 opacity-75">{label}</span>
      <input
        className={`${disabled ? "cursor-not-allowed" : ""} w-full border border-primaryDimmed bg-transparent ${extraStyles || ""} ${error ? "!border-alert" : ""}`}
        placeholder={placeholder}
        {...props}
        disabled={disabled}
      />
      {error && <div className="text-sm text-alert">{error.message}</div>}
    </div>
  );
};

export default Input;
