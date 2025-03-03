"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "~/hooks/useRedux";
import { useModalContext } from "~/context/modal-context";
import UserService from "~/services/user.service";
import { UserDTO } from "@playnest/core";
import ProfileModal from "~/components/profile-modal/ProfileModal";
import Loader from "~/components/loader/Loader";

function ProfileModalContainer() {
  const { closeModal } = useModalContext();
  const { isAuthorized, userJwtPayload } = useAppSelector((state) => state.common);

  useEffect(() => {
    if (!isAuthorized) closeModal();
  }, [isAuthorized, closeModal]);

  const [user, setUser] = useState<UserDTO | null>(null);
  const getUser = useCallback(async () => {
    if (!userJwtPayload) return;
    const id = userJwtPayload.id;
    const response = await UserService.get({ id });
    if (!response.success) return;
    setUser(response.data!);
  }, [userJwtPayload]);

  useEffect(() => {
    void getUser();
  }, [getUser]);

  return user ? <ProfileModal user={user} /> : <Loader />;
}

export default ProfileModalContainer;
