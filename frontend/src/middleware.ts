import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  // Optionally get session
  const session = await auth();

  console.log("=== Middleware Session ===");
  console.log("Path:", req.nextUrl.pathname);
  console.log("Session:", JSON.stringify(session, null, 2));
  console.log("==========================");

  // Let next-intl handle locale negotiation & redirects
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)",
  ],
};
