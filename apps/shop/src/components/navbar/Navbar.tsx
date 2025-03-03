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
import logInIcon from "~/assets/icons/log-in.svg";
import gamepadIcon2 from "~/assets/icons/gaming-pad-2.svg";
import dashboardIcon from "~/assets/icons/layout-alt.svg";
import BrandLogo from "~/components/brand-logo/BrandLogo";
import { useAppSelector } from "~/hooks/useRedux";
import { useModalContext } from "~/context/modal-context";
import ProfileModalContainer from "~/components/profile-modal/ProfileModalContainer";

const Navbar = () => {
  const { isAuthorized, userJwtPayload } = useAppSelector((state) => state.common);
  const { openModal } = useModalContext();

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
          {isAuthorized && userJwtPayload ? (
            <NavbarItem
              title={userJwtPayload.nickname}
              icon={userIcon}
              onClick={() => openModal({ component: <ProfileModalContainer /> })}
            />
          ) : (
            <LinkNavbarItem route={routes.login} title="Увійти" icon={logInIcon} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
