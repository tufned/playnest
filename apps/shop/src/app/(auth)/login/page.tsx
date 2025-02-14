"use client";

import React, { useState } from "react";
import AuthForm from "~/components/auth/auth-form/AuthForm";
import { SubmitHandler, useForm } from "react-hook-form";
import InputEmail from "~/components/auth/input-email/InputEmail";
import InputPassword from "~/components/auth/input-password/InputPassword";
import PasswordVisibility from "~/components/auth/password-visibility/PasswordVisibility";
import { UserLoginDTO } from "@playnest/shared/types/domains/user.types";
import { defaultValues } from "~/app/(auth)/login/constants";
import { setAccessToken } from "~/redux/api/auth";
import routes from "~/constants/routes";
import { useAppDispatch } from "~/hooks/useRedux";
import { useRouter } from "next/navigation";
import AuthService from "~/services/auth.service";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isPaswInputShown, setIsPaswInputShown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserLoginDTO>({ defaultValues });

  const onSubmit: SubmitHandler<UserLoginDTO> = async (data) => {
    const token = await AuthService.login({ data });
    if (!token.success) return;
    dispatch(setAccessToken(token.data!.accessToken));
    router.replace(routes.index);
  };

  return (
    <AuthForm page="login" onSubmit={handleSubmit(onSubmit)}>
      <InputEmail error={errors.email} register={register} />
      <div className="flex flex-col items-end">
        <InputPassword
          error={errors.password}
          register={register}
          isPaswInputShown={isPaswInputShown}
        />
        <PasswordVisibility
          visibilityToggle={() => setIsPaswInputShown((prev) => !prev)}
          isVisible={isPaswInputShown}
        />
      </div>
    </AuthForm>
  );
};

export default LoginPage;
