'use client';

import React from 'react';
import styles from '~/components/navbar/navbar.module.scss';
import routes from '~/constants/routes';
import NavbarItem from '~/components/navbar/NavbarItem';
import LinkNavbarItem from '~/components/navbar/LinkNavbarItem';
import Image from 'next/image';
import Link from 'next/link';
import homeIcon from '~/assets/icons/home.svg';
import guideIcon from '~/assets/icons/file-question.svg';
import gamepadIcon from '~/assets/icons/gaming-pad.svg';
import userIcon from '~/assets/icons/user.svg';
import logOutIcon from '~/assets/icons/log-out.svg';
import logInIcon from '~/assets/icons/log-in.svg';
import gamepadIcon2 from '~/assets/icons/gaming-pad-2.svg';
import dashboardIcon from '~/assets/icons/layout-alt.svg';

const Navbar = () => {
  return (
    <nav className='border-r border-primaryDimmed my-[35px] flex flex-col items-center'>
      <Link href={routes.index}>
        <div className='flex justify-center items-center gap-1 w-full'>
          <Image src={gamepadIcon} alt='playnest' width={30} height={30} />
          <h1 className='text-2xl font-bold'>playnest</h1>
        </div>
      </Link>
      <div className='flex flex-col justify-between items-center flex-1 w-full mt-[35%]'>
        <div className={styles.navbarList}>
          <LinkNavbarItem route={routes.index} title='Головна' icon={homeIcon} />
          <LinkNavbarItem route={routes.games} title='Ігри' icon={gamepadIcon2} />
          <LinkNavbarItem
            route={routes.dashboard}
            title='Гніздечко'
            icon={dashboardIcon}
          />
          <LinkNavbarItem route={routes.guide} title='Посібник' icon={guideIcon} />
        </div>
        <div className={styles.navbarList}>
          <NavbarItem title='username' icon={userIcon} />
          <NavbarItem title='Вийти' icon={logOutIcon} />
          <NavbarItem title='Увійти' icon={logInIcon} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
