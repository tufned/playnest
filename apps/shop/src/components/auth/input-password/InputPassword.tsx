import React from "react";
import Input from "~/components/input/Input";
import { authErrors } from "~/constants/errors";
import { authConfig } from "@playnest/core";
import { FieldError, FieldValues, Path, UseFormReturn } from "react-hook-form";

interface InputPasswordProps<T extends FieldValues> {
  register: UseFormReturn<T>["register"];
  error?: FieldError;
  isPaswInputShown: boolean;
  customLabel?: string;
  customField?: string;
}

const InputPassword = <T extends FieldValues>({
  error,
  register,
  isPaswInputShown,
  customLabel,
  customField
}: InputPasswordProps<T>) => {
  return (
    <Input
      label={customLabel || "Пароль"}
      placeholder={isPaswInputShown ? "qwErty1234" : "********"}
      error={error}
      {...register((customField || "password") as Path<T>, {
        required: authErrors.requiredField(),
        minLength: {
          value: authConfig.password.minLength,
          message: authErrors.minLength(authConfig.password.minLength)
        },
        maxLength: {
          value: authConfig.password.maxLength,
          message: authErrors.maxLength(authConfig.password.maxLength)
        },
        validate: (val) => val.toLowerCase() !== val || authErrors.passwordUpperCase
      })}
      type={isPaswInputShown ? "text" : "password"}
    />
  );
};

export default InputPassword;
