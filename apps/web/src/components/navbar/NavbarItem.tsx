import React, { FC } from 'react';
import styles from '~/components/navbar/navbar.module.scss';
import Image from 'next/image';
import { NavbarItemProps } from '~/components/navbar/navbar.types';

const NavbarItem: FC<NavbarItemProps> = ({ title, icon }) => {
  return (
    <div className={`${styles.navbarItem} flex items-center gap-2.5`}>
      <Image src={icon || ''} width={23} height={23} alt='icon' />
      <span>{title}</span>
    </div>
  );
};

export default NavbarItem;
