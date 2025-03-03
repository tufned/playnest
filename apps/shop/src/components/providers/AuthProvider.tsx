"use client";

import React from "react";
import { useGetAccessTokenQuery } from "~/redux/api/auth";
import Loader from "~/components/loader/Loader";

// TODO: implement error message

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useGetAccessTokenQuery();

  if (isLoading) return <Loader fullScreen />;
  return <div>{children}</div>;
};

export default AuthProvider;
