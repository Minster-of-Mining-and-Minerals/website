import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "./auth";
import {
  AUTH_CHANGE_PASSWORD,
  AUTH_GATEWAY_ROUTES,
  AUTH_LOGIN,
  LEGACY_AUTH_REDIRECTS,
} from "./constants/authRoutes";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const locale =
    routing.locales.find((l) => pathname.startsWith(`/${l}`)) ??
    routing.defaultLocale;

  const pathnameWithoutLocale =
    pathname.replace(new RegExp(`^/${locale}`), "") || "/";

  const legacyRedirect = LEGACY_AUTH_REDIRECTS[pathnameWithoutLocale];
  if (legacyRedirect) {
    const redirectUrl = new URL(`/${locale}${legacyRedirect}`, req.url);
    req.nextUrl.searchParams.forEach((value, key) => {
      redirectUrl.searchParams.set(key, value);
    });
    return NextResponse.redirect(redirectUrl);
  }

  const session = await auth();
  const hasSessionToken = !!session;

  const isAuthRoute = AUTH_GATEWAY_ROUTES.includes(
    pathnameWithoutLocale as (typeof AUTH_GATEWAY_ROUTES)[number]
  );
  const isAdminRoute = pathnameWithoutLocale.startsWith("/admin");

  const hasCallbackUrl = req.nextUrl.searchParams.has("callbackUrl");
  const hasError = req.nextUrl.searchParams.has("error");

  if (isAuthRoute && hasSessionToken && !hasCallbackUrl && !hasError) {
    return NextResponse.redirect(new URL(`/${locale}/admin/dashboard`, req.url));
  }

  if (isAdminRoute && !hasSessionToken) {
    const loginUrl = new URL(`/${locale}${AUTH_LOGIN}`, req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (
    hasSessionToken &&
    session.user?.is_first_logged_in &&
    pathnameWithoutLocale !== AUTH_CHANGE_PASSWORD
  ) {
    return NextResponse.redirect(
      new URL(`/${locale}${AUTH_CHANGE_PASSWORD}`, req.url)
    );
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\..*).*)",
  ],
};
