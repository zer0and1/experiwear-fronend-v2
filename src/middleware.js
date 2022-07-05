import { NextResponse } from 'next/server';
import { LINKS } from 'utils/constants/enums';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const protectedPages = Object.values(LINKS)
    .filter((p) => p.protected && p.path !== LINKS.home.path)
    .map((p) => p.path);
  const isProtectedPage =
    pathname === LINKS.home.path ||
    protectedPages.some((p) => pathname.startsWith(p.replace(/\:[^]*/, '')));

  if (isProtectedPage && !req.cookies.get('fan_sid')) {
    const url = req.nextUrl.clone();
    url.pathname = LINKS.signIn.path;
    url.search = `redirect=${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
