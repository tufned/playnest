import React, { useEffect } from "react";
import CloseIcon from "~/assets/icons/x-close.svg";
import Image from "next/image";
import { useModalContext } from "~/context/modal-context";
import { useAppSelector } from "~/hooks/useRedux";
import ProfileModalContent from "~/components/profile-modal/ProfileModalContent";

function ProfileModal() {
  const { closeModal } = useModalContext();
  const { isAuthorized } = useAppSelector((state) => state.common);

  useEffect(() => {
    if (!isAuthorized) closeModal();
  }, [isAuthorized, closeModal]);

  return (
    <div className="rounded-3xl bg-primary w-2/3 max-w-[550px] h-5/6 max-h-[800px] px-5 py-7 flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold ml-6">Профіль</h2>
        <div className="button-wrapper w-fit" onClick={closeModal}>
          <Image src={CloseIcon} alt="закрити" width={30} height={30} />
        </div>
      </div>
      <div className="flex-1">
        <ProfileModalContent />
      </div>
    </div>
  );
}

export default ProfileModal;
