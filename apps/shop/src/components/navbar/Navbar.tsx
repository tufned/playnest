"use client";

import React from "react";
import styles from "~/components/navbar/navbar.module.scss";
import routes from "~/constants/routes";
import NavbarItem from "~/components/navbar/NavbarItem";
import LinkNavbarItem from "~/components/navbar/LinkNavbarItem";
import Link from "next/link";
import homeIcon from "~/assets/icons/home.svg";
import guideIcon from "~/assets/icons/file-question.svg";
import userIcon from "~/assets/icons/user.svg";
import logOutIcon from "~/assets/icons/log-out.svg";
import logInIcon from "~/assets/icons/log-in.svg";
import gamepadIcon2 from "~/assets/icons/gaming-pad-2.svg";
import dashboardIcon from "~/assets/icons/layout-alt.svg";
import BrandLogo from "~/components/brand-logo/BrandLogo";
import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import AuthService from "~/services/auth.service";
import { setAccessToken } from "~/redux/api/auth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuthorized = useAppSelector((state) => state.common.isAuthorized);

  // TODO: fetch user data

  const handleLogout = async () => {
    const response = await AuthService.logout();
    if (!response.success) return;
    dispatch(setAccessToken(null));
    router.replace(routes.index);
  };

  return (
    <nav className="border-r border-primaryDimmed my-[35px] flex flex-col items-center">
      <Link href={routes.index}>
        <BrandLogo />
      </Link>
      <div className="flex flex-col justify-between items-center flex-1 w-full mt-[35%]">
        <div className={styles.navbarList}>
          <LinkNavbarItem route={routes.index} title="Головна" icon={homeIcon} />
          <LinkNavbarItem route={routes.games} title="Ігри" icon={gamepadIcon2} />
          {isAuthorized && (
            <LinkNavbarItem
              route={routes.dashboard}
              title="Гніздечко"
              icon={dashboardIcon}
            />
          )}
          <LinkNavbarItem route={routes.guide} title="Посібник" icon={guideIcon} />
        </div>
        <div className={styles.navbarList}>
          {isAuthorized ? (
            <>
              <NavbarItem title="username" icon={userIcon} />
              <NavbarItem title="Вийти" icon={logOutIcon} onClick={handleLogout} />
            </>
          ) : (
            <LinkNavbarItem route={routes.login} title="Увійти" icon={logInIcon} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
