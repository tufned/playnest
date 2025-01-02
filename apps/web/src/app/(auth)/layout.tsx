import React from 'react';
import BrandLogo from '~/components/brand-logo/BrandLogo';
import BackButton from '~/components/back-button/BackButton';
import routes from '~/constants/routes';
import Link from 'next/link';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex-center min-h-screen'>
      <div className='absolute top-0 left-0 px-4 py-6'>
        <BackButton href={routes.index} label='На головну' />
      </div>
      <div className='flex-col flex-center'>
        <div className='mb-5'>
          <Link href={routes.index}>
            <BrandLogo />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
