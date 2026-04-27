import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
  title: "Minstry of Mines Website",
  description: "This is the official website of the Minstry of Mines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased text-primary`}
      >
        <NextTopLoader showSpinner={false} />
        <NextIntlClientProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
