import { ReactNode } from "react";
import "~/styles/globals.scss";
import { metaData } from "~/constants/metadata";
import ReduxProvider from "~/components/providers/ReduxProvider";

export const metadata = metaData;

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ua" data-lt-installed="true">
      <body className="bg-primary">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
