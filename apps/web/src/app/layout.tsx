import { ReactNode } from 'react';
import '~/styles/globals.scss';
import { metaData } from '~/constants/metadata';

export const metadata = metaData;

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='ua' data-lt-installed='true'>
      <body className='bg-primary'>{children}</body>
    </html>
  );
}
