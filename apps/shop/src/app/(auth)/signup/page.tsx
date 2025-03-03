"use client";

import React, { useState } from "react";
import Input from "~/components/input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserSignupForm } from "~/types";
import authService from "~/services/auth.service";
import { defaultValues } from "~/app/(auth)/signup/constats";
import { authErrors } from "~/constants/errors";
import PasswordVisibility from "~/components/auth/password-visibility/PasswordVisibility";
import { authConfig } from "@playnest/core";
import InputPassword from "~/components/auth/input-password/InputPassword";
import InputEmail from "~/components/auth/input-email/InputEmail";
import AuthForm from "~/components/auth/auth-form/AuthForm";
import { setAccessToken } from "~/redux/api/auth";
import { useAppDispatch } from "~/hooks/useRedux";
import { useRouter } from "next/navigation";
import routes from "~/constants/routes";
import InputPasswordConfirm from "~/components/auth/input-password-confirm/InputPasswordConfirm";

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isPaswInputShown, setIsPaswInputShown] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<UserSignupForm>({ defaultValues });

  const onSubmit: SubmitHandler<UserSignupForm> = async (data) => {
    const response = await authService.signup({ data });
    if (!response.success) return;
    dispatch(setAccessToken(response.data!.accessToken));
    router.replace(routes.index);
  };

  return (
    <AuthForm page="signup" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Псевдонім"
        placeholder="ob1"
        error={errors.nickname}
        {...register("nickname", {
          required: authErrors.requiredField(),
          minLength: {
            value: authConfig.nickname.minLength,
            message: authErrors.minLength(authConfig.nickname.minLength)
          },
          maxLength: {
            value: authConfig.nickname.maxLength,
            message: authErrors.maxLength(authConfig.nickname.maxLength)
          }
        })}
      />
      <InputEmail error={errors.email} register={register} />
      <InputPassword
        error={errors.password}
        register={register}
        isPaswInputShown={isPaswInputShown}
      />
      <div className="flex flex-col items-end">
        <InputPasswordConfirm
          error={errors.passwordConfirm}
          register={register}
          isPaswInputShown={isPaswInputShown}
          passwordFieldValue={watch("password")}
        />
        <PasswordVisibility
          visibilityToggle={() => setIsPaswInputShown((prev) => !prev)}
          isVisible={isPaswInputShown}
        />
      </div>
    </AuthForm>
  );
};

export default SignupPage;
