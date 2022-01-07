import { NextResponse } from 'next/server';
import { LINKS } from 'utils/constants';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const protectedPages = Object.values(LINKS)
    .filter((p) => p.protected && p.path !== LINKS.home.path)
    .map((p) => p.path);
  const isProtectedPage =
    pathname === LINKS.home.path ||
    protectedPages.some((p) => pathname.startsWith(p.replace(/\:[^]*/, '')));

  if (isProtectedPage && !req.cookies.fan_id) {
    return NextResponse.redirect(`${LINKS.signIn.path}?redirect=${pathname}`);
  }

  return NextResponse.next();
}
