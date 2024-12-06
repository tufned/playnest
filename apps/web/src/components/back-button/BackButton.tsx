import React, { FC, HTMLAttributes } from 'react';
import Image from 'next/image';
import arrowIcon from '~/assets/icons/chevron-left.svg';
import Link from 'next/link';

interface BackButtonProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  href?: string;
}

const BackButtonContent = ({ label }: { label: BackButtonProps['label'] }) => {
  return (
    <div className='button-wrapper flex-center gap-0.5 py-1.5 pl-1 pr-3'>
      <Image src={arrowIcon} alt='arrow' height={27} />
      <span>{label}</span>
    </div>
  );
};

const BackButton: FC<BackButtonProps> = ({ label = 'Повернутись', href, ...props }) => {
  if (href)
    return (
      <Link href={href}>
        <BackButtonContent label={label} />
      </Link>
    );
  else return <BackButtonContent label={label} {...props} />;
};

export default BackButton;
