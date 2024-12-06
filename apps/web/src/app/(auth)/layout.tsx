import React from 'react';
import BrandLogo from '~/components/brand-logo/BrandLogo';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex-center min-h-screen'>
      <div className='absolute top-0 left-0'>{/* back button */}</div>
      <div className='flex-col flex-center'>
        <div className='mb-5'>
          <BrandLogo />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
