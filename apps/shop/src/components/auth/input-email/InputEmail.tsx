import React from "react";
import { authErrors } from "~/constants/errors";
import { authConfig } from "@playnest/core";
import Input from "~/components/input/Input";
import { FieldError, FieldValues, Path, UseFormReturn } from "react-hook-form";

interface InputEmailProps<T extends FieldValues> {
  register: UseFormReturn<T>["register"];
  error?: FieldError;
  disabled?: boolean;
}

const InputEmail = <T extends FieldValues>({
  error,
  register,
  disabled = false
}: InputEmailProps<T>) => {
  return (
    <Input
      label="Email"
      placeholder="user@mail.com"
      error={error}
      disabled={disabled}
      {...register("email" as Path<T>, {
        required: authErrors.requiredField(),
        minLength: {
          value: authConfig.email.minLength,
          message: authErrors.invalidEmail
        },
        validate: (val) => {
          const isValid = val.includes("@") && val.includes(".");
          return isValid || authErrors.invalidEmail;
        }
      })}
      type="email"
    />
  );
};

export default InputEmail;
