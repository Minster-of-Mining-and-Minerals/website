import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "./auth";

const intlMiddleware = createMiddleware(routing);

const publicRoutes = [
  "/",
  "/login",
];
const authRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Get locale
  const locale =
    routing.locales.find((l) => pathname.startsWith(`/${l}`)) ??
    routing.defaultLocale;

  const pathnameWithoutLocale =
    pathname.replace(new RegExp(`^/${locale}`), "") || "/";

  // Use auth() to get the actual session
  const session = await auth();
  const hasSessionToken = !!session;

  const isPublicRoute = publicRoutes.includes(pathnameWithoutLocale);
  const isAuthRoute = authRoutes.includes(pathnameWithoutLocale);
  const isAdminRoute = pathnameWithoutLocale.startsWith("/admin");

  console.log("🔐 MIDDLEWARE DEBUG:", {
    pathname,
    pathnameWithoutLocale,
    hasSessionToken,
    isAdminRoute
  });

  // 🔐 Rule 1: If logged in and trying to access login page, redirect to dashboard
  const hasCallbackUrl = req.nextUrl.searchParams.has("callbackUrl");
  const hasError = req.nextUrl.searchParams.has("error");

  if (isAuthRoute && hasSessionToken && !hasCallbackUrl && !hasError) {
    return NextResponse.redirect(new URL(`/${locale}/admin/dashboard`, req.url));
  }

  // 🔒 Rule 2: If NOT logged in and trying to access protected route, redirect to login
  if (isAdminRoute && !hasSessionToken) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    
    const response = NextResponse.redirect(loginUrl);
    
    // Only clear cookies if we are absolutely sure there is no session
    // to prevent clearing a valid but unreadable session if it's a transient issue.
    // However, if we are here, auth() returned null.
    return response;
  }

  // 🛡️ Rule 3: Forced password change
  if (hasSessionToken && session.user?.is_first_logged_in && pathnameWithoutLocale !== "/change-password") {
    return NextResponse.redirect(new URL(`/${locale}/change-password`, req.url));
  }

  // ✅ Apply intl middleware for normal routing
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Match all routes except static files, API routes, etc.
    "/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\..*).*)",
  ],
};