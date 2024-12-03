import { ReactNode } from 'react';
import Navbar from '~/components/navbar/Navbar';
import Header from '~/components/header/Header';

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='grid grid-cols-[220px_1fr] min-h-screen'>
      <Navbar />
      <div className='grid grid-rows-[100px_1fr]'>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
