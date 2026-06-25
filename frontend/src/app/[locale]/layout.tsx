import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from "@/components/ui/sonner";
import { getRootMetadata } from "@/lib/seo";

export const metadata: Metadata = getRootMetadata();

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`antialiased text-primary`}
        suppressHydrationWarning
      >
        <NextTopLoader showSpinner={false} />
        <NextIntlClientProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </NextIntlClientProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
