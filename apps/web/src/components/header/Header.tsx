'use client';

import React from 'react';
import Search from '~/components/search/Search';
import Image from 'next/image';
import bellIcon from '~/assets/icons/bell.svg';

const Header = () => {
  return (
    <div className='flex justify-between items-center'>
      <Search />
      <div className='flex-center'>
        <div className='button-wrapper'>
          <Image src={bellIcon} alt='notifications' width={23} height={23} />
          <span>Повідомлення</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
