"use client";

import React from "react";
import ErrorModal from "~/components/error-modal/ErrorModal";
import { useAppSelector } from "~/hooks/useRedux";
import { selectAppError } from "~/redux/slices/error";

function ErrorModalsLayout() {
  const appErrors = useAppSelector(selectAppError);

  return (
    appErrors.length > 0 && (
      <div className="absolute bottom-5 right-4 flex flex-col gap-2.5 items-end">
        {appErrors.map((error) => (
          <ErrorModal key={error.id} error={error} />
        ))}
      </div>
    )
  );
}

export default ErrorModalsLayout;
