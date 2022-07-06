import { COOKIE_NAME } from 'config';
import { IS_PRODUCT } from 'config';
import { PROXY_URL } from 'config';
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

  if (isProtectedPage) {
    const cookie = req.cookies.get(COOKIE_NAME);
    const authStatus =
      cookie &&
      (await fetch(`${PROXY_URL}/auth/is-authenticated`, {
        headers: {
          cookie,
        },
      }));
    if (!cookie || (IS_PRODUCT && !authStatus.id)) {
      const url = req.nextUrl.clone();
      url.pathname = LINKS.signIn.path;
      url.search = `redirect=${pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
