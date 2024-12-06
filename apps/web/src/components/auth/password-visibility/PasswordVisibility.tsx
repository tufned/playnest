import React, { FC } from 'react';
import Image from 'next/image';
import EyeOffIcon from '~/assets/icons/eye-off.svg';
import EyeIcon from '~/assets/icons/eye.svg';

interface InputPasswordVisibilityWrapperProps {
  isVisible: boolean;
  visibilityToggle: () => void;
}

const iconHeight = 16;

const PasswordVisibility: FC<InputPasswordVisibilityWrapperProps> = ({
  isVisible,
  visibilityToggle
}) => {
  return (
    <div
      className='flex items-center justify-end gap-1 cursor-pointer select-none button-wrapper py-1 px-2 rounded-lg size-fit'
      onClick={visibilityToggle}
    >
      {isVisible ? (
        <Image src={EyeOffIcon} height={iconHeight} alt='eye-off' />
      ) : (
        <Image src={EyeIcon} height={iconHeight} alt='eye' />
      )}
      <span className='text-xs'>{isVisible ? 'Сховати' : 'Показати'} пароль</span>
    </div>
  );
};

export default PasswordVisibility;
