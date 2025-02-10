"use client";

import React from "react";
import { useGetAccessTokenQuery } from "~/redux/api/auth";

// TODO: implement error message

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useGetAccessTokenQuery();

  if (isLoading)
    return <div className="h-screen w-screen flex-center text-xl">Loading...</div>;
  return <div>{children}</div>;
};

export default AuthProvider;
