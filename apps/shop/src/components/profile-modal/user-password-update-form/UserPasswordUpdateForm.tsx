"use client";

import React, { useState } from "react";
import InputPassword from "~/components/auth/input-password/InputPassword";
import PasswordVisibility from "~/components/auth/password-visibility/PasswordVisibility";
import { useForm } from "react-hook-form";
import { UserUpdatePasswordForm } from "~/types";
import SubmitButton from "~/components/submit-button/SubmitButton";
import { defaultValues } from "./constants";
import Image from "next/image";
import CheckCircleIcon from "~/assets/icons/check-circle.svg";
import UserService from "~/services/user.service";
import InputPasswordConfirm from "~/components/auth/input-password-confirm/InputPasswordConfirm";

function UserPasswordUpdateForm({ userId }: { userId: number }) {
  const [isPaswInputShown, setIsPaswInputShown] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<UserUpdatePasswordForm>({ defaultValues });

  async function onSubmit(data: UserUpdatePasswordForm) {
    const response = await UserService.updatePassword({ id: userId, data });
    if (!response.success) return;
    setIsSubmitted(true);
  }

  return (
    <form className="my-9" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl font-semibold my-3">Зміна паролю</h3>
      <div className="flex flex-col items-end w-full">
        <InputPassword
          error={errors.password}
          register={register}
          isPaswInputShown={isPaswInputShown}
          customLabel="Поточний пароль"
          customField="password"
        />
        <div className="mt-3 w-full">
          <InputPassword
            error={errors.newPassword}
            register={register}
            isPaswInputShown={isPaswInputShown}
            customLabel="Новий пароль"
            customField="newPassword"
          />
          <InputPasswordConfirm
            error={errors.newPasswordConfirm}
            register={register}
            isPaswInputShown={isPaswInputShown}
            passwordFieldValue={watch("newPassword")}
            customLabel="Підтвердження нового паролю"
            customField="newPasswordConfirm"
          />
        </div>
        <PasswordVisibility
          visibilityToggle={() => setIsPaswInputShown((prev) => !prev)}
          isVisible={isPaswInputShown}
        />
      </div>
      <div className="flex items-center justify-end gap-2 mt-3">
        {isSubmitted && (
          <Image src={CheckCircleIcon} alt="збережено" width={24} height={24} />
        )}
        <SubmitButton>Зберегти</SubmitButton>
      </div>
    </form>
  );
}

export default UserPasswordUpdateForm;
