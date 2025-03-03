"use client";

import React, { useMemo, useState } from "react";
import Input from "~/components/input/Input";
import InputEmail from "~/components/auth/input-email/InputEmail";
import { useForm } from "react-hook-form";
import type { UserUpdateForm } from "~/types";
import SubmitButton from "~/components/submit-button/SubmitButton";
import UserService from "~/services/user.service";
import Image from "next/image";
import CheckCircleIcon from "~/assets/icons/check-circle.svg";
import { useAppDispatch } from "~/hooks/useRedux";
import { commonSlice } from "~/redux/slices/common";

interface UserUpdateFormProps {
  userId: number;
  user: UserUpdateForm;
}

function UserUpdateForm({ user, userId }: UserUpdateFormProps) {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch } = useForm<UserUpdateForm>({
    defaultValues: user
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nicknameField = watch("nickname");

  const isButtonDisabled = useMemo(
    () => user.nickname === nicknameField,
    [user, nicknameField]
  );

  async function onSubmit(data: UserUpdateForm) {
    const response = await UserService.update({ id: userId, user: data });
    if (!response.success) return;
    setIsSubmitted(true);
    dispatch(
      commonSlice.actions.setUserJwtPayload({ nickname: response.data!.nickname })
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputEmail register={register} disabled />
      <Input label="Нік" placeholder="ob1" {...register("nickname")} />
      <div className="flex items-center justify-end gap-2 mt-3">
        {isSubmitted && (
          <Image src={CheckCircleIcon} alt="збережено" width={24} height={24} />
        )}
        <SubmitButton disabled={isButtonDisabled}>Зберегти</SubmitButton>
      </div>
    </form>
  );
}

export default UserUpdateForm;
