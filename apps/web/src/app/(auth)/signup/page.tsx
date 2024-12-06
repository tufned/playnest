'use client';

import React, { useState } from 'react';
import Input from '~/components/input/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserSignupForm } from '~/types';
import authService from '~/services/auth';
import { defaultValues } from '~/app/(auth)/signup/constats';
import authErrors from '~/constants/errors/auth';
import PasswordVisibility from '~/components/auth/password-visibility/PasswordVisibility';
import { authConfig } from '@playnest/utils';
import InputPassword from '~/components/auth/input-password/InputPassword';
import InputEmail from '~/components/auth/input-email/InputEmail';
import AuthForm from '~/components/auth/auth-form/AuthForm';

const SignupPage = () => {
  const [isPaswInputShown, setIsPaswInputShown] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<UserSignupForm>({ defaultValues });

  const onSubmit: SubmitHandler<UserSignupForm> = async (data) => {
    // TODO: implement signup service to retrieve jwt tokens
    console.log(data);
    // const response = await authService.signup(data);
  };

  return (
    <AuthForm page='signup' onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Нік'
        placeholder='ob1'
        error={errors.nickname}
        {...register('nickname', {
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
      <div className='flex flex-col items-end'>
        <Input
          label='Підтвердження паролю'
          placeholder={isPaswInputShown ? 'qwErty1234' : '********'}
          error={errors.passwordConfirm}
          {...register('passwordConfirm', {
            required: authErrors.requiredField(),
            validate: (val) => {
              const pasw = getValues('password');
              return val === pasw || authErrors.passwordMismatch;
            }
          })}
          type={isPaswInputShown ? 'text' : 'password'}
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
