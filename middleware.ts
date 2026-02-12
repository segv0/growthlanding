import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths, static assets, and variant routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|ico|webp|css|js|woff2?)$/)
  ) {
    return;
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Detect preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLocale = acceptLanguage.toLowerCase().includes("tr")
    ? "tr"
    : i18n.defaultLocale;

  // Redirect to locale-prefixed path
  const newUrl = new URL(`/${preferredLocale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  newUrl.hash = request.nextUrl.hash;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|.*\\..*).*)"],
};
