"use client";

import React, { useMemo } from "react";
import CloseIcon from "~/assets/icons/x-close.svg";
import Image from "next/image";
import { useModalContext } from "~/context/modal-context";
import { useAppDispatch } from "~/hooks/useRedux";
import UserPasswordUpdateForm from "~/components/profile-modal/user-password-update-form/UserPasswordUpdateForm";
import logOutIcon from "~/assets/icons/log-out.svg";
import UserUpdateForm from "~/components/profile-modal/user-update-form/UserUpdateForm";
import { useRouter } from "next/navigation";
import { setAccessToken } from "~/redux/api/auth";
import routes from "~/constants/routes";
import AuthService from "~/services/auth.service";
import { UserDTO } from "@playnest/core";
import UserMapper from "~/mappers/user.mapper";

interface ProfileModalProps {
  user: UserDTO;
}

function ProfileModal({ user }: ProfileModalProps) {
  const { closeModal } = useModalContext();
  const userUpdateFormValues = useMemo(() => UserMapper.toUpdateFormValues(user), [user]);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await AuthService.logout();
    if (!response.success) return;
    dispatch(setAccessToken(null));
    router.replace(routes.index);
  };

  return (
    <div className="rounded-3xl bg-primary w-2/3 max-w-[550px] h-5/6 max-h-[800px] px-5 py-7 flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold ml-8">Профіль</h2>
        <div className="button-wrapper w-fit" onClick={closeModal}>
          <Image src={CloseIcon} alt="закрити" width={30} height={30} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="h-full flex flex-col justify-between">
          <div className="my-5">
            <UserUpdateForm userId={user.id} user={userUpdateFormValues} />
            <UserPasswordUpdateForm userId={user.id} />
          </div>
          <div>
            <div
              className="button-wrapper flex-center w-fit gap-2.5 border border-transparent"
              onClick={handleLogout}
            >
              <Image src={logOutIcon} width={23} height={23} alt="icon" />
              <span className="text-alert">Вийти</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
