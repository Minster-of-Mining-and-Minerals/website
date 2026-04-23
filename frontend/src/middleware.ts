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
  
  // Apply intl middleware first
  const intlResponse = intlMiddleware(req);

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

  console.log("🔐 MIDDLEWARE DEBUG:");
  console.log("  Path:", pathnameWithoutLocale);
  console.log("  Has valid session:", hasSessionToken);
  console.log("  Is public route:", isPublicRoute);
  if (hasSessionToken) {
    console.log("  User ID:", session.user?.id);
    console.log("  Is First Login:", session.user?.is_first_logged_in);
  }

  // 🔐 Rule 1: If logged in and trying to access login page, redirect to dashboard
  if (isAuthRoute && hasSessionToken) {
    console.log("  Redirecting authenticated user to dashboard");
    return NextResponse.redirect(new URL(`/${locale}/admin/dashboard`, req.url));
  }

  // 🔒 Rule 2: If NOT logged in and trying to access protected route, redirect to login
  if (isAdminRoute && !hasSessionToken) {
    console.log("  Redirecting unauthenticated user to login");
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    
    // IMPORTANT: Clear any stale cookies if session is null but we are on an admin route
    const response = NextResponse.redirect(loginUrl);
    // You can't easily clear "all" next-auth cookies here without knowing their names,
    // but usually NextAuth handles this if signOut was successful.
    // However, if we are here, it means hasSessionToken is false.
    return response;
  }

  // 🛡️ Rule 3: Forced password change for first-time login
  if (hasSessionToken && session.user?.is_first_logged_in && pathnameWithoutLocale !== "/change-password") {
    console.log("  Forcing password change for new user");
    return NextResponse.redirect(new URL(`/${locale}/change-password`, req.url));
  }

  // ✅ Allow access
  return intlResponse;
}

export const config = {
  matcher: [
    // Match all routes except static files, API routes, etc.
    "/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\..*).*)",
  ],
};