'use client';

import React, { useState } from 'react';
import AuthForm from '~/components/auth/auth-form/AuthForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputEmail from '~/components/auth/input-email/InputEmail';
import InputPassword from '~/components/auth/input-password/InputPassword';
import PasswordVisibility from '~/components/auth/password-visibility/PasswordVisibility';
import { IUserLogin } from '@playnest/utils';
import { defaultValues } from '~/app/(auth)/login/constants';

const LoginPage = () => {
  const [isPaswInputShown, setIsPaswInputShown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserLogin>({ defaultValues });

  const onSubmit: SubmitHandler<IUserLogin> = async (data) => {
    // TODO: implement login service to retrieve jwt tokens
    console.log(data);
  };

  return (
    <AuthForm page='login' onSubmit={handleSubmit(onSubmit)}>
      <InputEmail error={errors.email} register={register} />
      <div className='flex flex-col items-end'>
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
