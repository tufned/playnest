import React from 'react';
import Image from 'next/image';
import searchIcon from '~/assets/icons/search.svg';

const Search = () => {
  return (
    <div className='relative flex-center w-2/5 min-w-44'>
      <input className='rounded-full pl-4 pr-10 py-2 w-full border border-secondaryBorder' />
      <div className='absolute right-0 px-3 pointer-events-none'>
        <Image src={searchIcon} alt='search' width={20} height={20} />
      </div>
    </div>
  );
};

export default Search;
