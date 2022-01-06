import { NextResponse } from 'next/server';
import { LINKS } from 'utils/constants';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const publicPages = Object.values(LINKS)
    .filter((p) => p.public)
    .map((p) => p.path);

  if (!pathname.startsWith('/assets') && !publicPages.includes(pathname)) {
    const res = NextResponse.redirect('/auth/sign-in');
    res.cookie('some', req.cookies.fan_sid);
    return res;
  }
}
