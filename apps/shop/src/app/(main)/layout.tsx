import { ReactNode } from "react";
import Navbar from "~/components/navbar/Navbar";
import Header from "~/components/header/Header";
import AuthProvider from "~/components/providers/AuthProvider";

export default function MainLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="grid grid-cols-[220px_1fr] min-h-screen">
        <Navbar />
        <div className="grid grid-rows-[100px_1fr] px-12">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}
