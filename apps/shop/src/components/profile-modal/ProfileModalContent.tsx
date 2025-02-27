import React from "react";
import { useAppDispatch } from "~/hooks/useRedux";
import { useRouter } from "next/navigation";
import { setAccessToken } from "~/redux/api/auth";
import routes from "~/constants/routes";
import AuthService from "~/services/auth.service";
import Image from "next/image";
import logOutIcon from "~/assets/icons/log-out.svg";

function ProfileModalContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await AuthService.logout();
    if (!response.success) return;
    dispatch(setAccessToken(null));
    router.replace(routes.index);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div></div>
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
  );
}

export default ProfileModalContent;
