import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
  title: "Minstry of Mines Website",
  description: "This is the official website of the Minstry of Mines",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/logo-only.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/logo-only.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased text-primary`}
        suppressHydrationWarning
      >
        <NextTopLoader showSpinner={false} />
        <NextIntlClientProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
