"use client";

import React from "react";
import Image from "next/image";
import { useAppDispatch } from "~/hooks/useRedux";
import { errorSlice } from "~/redux/slices/error";
import { AppErrorState } from "~/types";
import CloseIcon from "~/assets/icons/x-close-white.svg";

interface ErrorModal {
  error: AppErrorState;
}

function ErrorModal({ error }: ErrorModal) {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(errorSlice.actions.removeAppError(error.id));
  };

  return (
    <div
      id={String(error.id)}
      className="w-fit py-2.5 px-4 bg-alert rounded-2xl shadow-[0px_0px_30px_rgba(0,0,0,0.25)] z-50 flex items-center gap-2"
      title={error.message}
    >
      <span className="text-white max-w-80 text-ellipsis whitespace-nowrap overflow-hidden cursor-default">
        {error.message}
      </span>
      <button onClick={handleCloseModal} className="hover:bg-alertDimmed rounded-lg p-1">
        <Image src={CloseIcon} alt="close" width={22} height={22} />
      </button>
    </div>
  );
}

export default ErrorModal;
