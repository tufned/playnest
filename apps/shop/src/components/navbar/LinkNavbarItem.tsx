"use client";

import React, { FC } from "react";
import Link from "next/link";
import { Routes } from "~/types";
import NavbarItem from "~/components/navbar/NavbarItem";
import { NavbarItemProps } from "~/components/navbar/navbar.types";
import { usePathname } from "next/navigation";
import styles from "~/components/navbar/navbar.module.scss";

interface LinkNavbarItemProps extends NavbarItemProps {
  route: Routes;
}

const LinkNavbarItem: FC<LinkNavbarItemProps> = ({ route, ...props }) => {
  const pathname = usePathname();

  return (
    <Link
      href={route || ""}
      className={`w-full flex-center ${pathname === route ? styles.linkNavbarItemActive : ""}`}
    >
      <NavbarItem {...props} />
    </Link>
  );
};

export default LinkNavbarItem;
