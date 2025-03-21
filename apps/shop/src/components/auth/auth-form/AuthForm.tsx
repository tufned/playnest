import React, { FC } from "react";
import Link from "next/link";
import routes from "~/constants/routes";
import { UseFormReturn } from "react-hook-form";
import styles from "./auth-form.module.scss";
import SubmitButton from "~/components/submit-button/SubmitButton";

interface AuthFormWrapperProps {
  children: React.ReactNode;
  page: "login" | "signup";
  onSubmit: ReturnType<UseFormReturn["handleSubmit"]>;
}

const AuthForm: FC<AuthFormWrapperProps> = ({ children, page, onSubmit }) => {
  return (
    <>
      <h2 className="font-bold text-3xl mb-2">
        {page === "login" ? "Вхід" : "Реєстрація"}
      </h2>
      <form className={`flex-col flex-center ${styles.authForm}`} onSubmit={onSubmit}>
        {children}
        <SubmitButton className="mt-3">
          {page === "login" ? "Увійти" : "Зареєструватися"}
        </SubmitButton>
      </form>
      <div className="flex-center flex-col w-full my-4 border-t border-primaryDimmed">
        <p className="py-2 text-sm opacity-40">Або</p>
        <Link
          href={page === "login" ? routes.signup : routes.login}
          className="group button-primary text-sm !px-3 !py-1.5"
        >
          <button className="opacity-60 group-hover:opacity-100">
            {page === "login" ? "Зареєструватися" : "Увійти"}
          </button>
        </Link>
      </div>
    </>
  );
};

export default AuthForm;
