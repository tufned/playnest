import React from "react";
import Input from "~/components/input/Input";
import { authErrors } from "~/constants/errors";
import { FieldError, FieldValues, Path, UseFormReturn } from "react-hook-form";

interface InputPasswordProps<T extends FieldValues> {
  register: UseFormReturn<T>["register"];
  error?: FieldError;
  isPaswInputShown: boolean;
  passwordFieldValue: string;
  customLabel?: string;
  customField?: string;
}

function InputPasswordConfirm<T extends FieldValues>({
  error,
  register,
  isPaswInputShown,
  passwordFieldValue,
  customLabel,
  customField
}: InputPasswordProps<T>) {
  return (
    <Input
      label={customLabel || "Підтвердження паролю"}
      placeholder={isPaswInputShown ? "qwErty1234" : "********"}
      error={error}
      {...register((customField || "passwordConfirm") as Path<T>, {
        required: authErrors.requiredField(),
        validate: (val) => {
          return val === passwordFieldValue || authErrors.passwordMismatch;
        }
      })}
      type={isPaswInputShown ? "text" : "password"}
    />
  );
}

export default InputPasswordConfirm;
