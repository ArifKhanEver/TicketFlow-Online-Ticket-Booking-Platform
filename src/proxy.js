import { NextResponse } from 'next/server';
import { headers } from "next/headers";
import { auth } from './lib/auth';

export async function proxy(request) {
const session = await auth.api.getSession({
      headers: await headers()
  });
 
  if (!session) {
    const signInUrl = new URL('/auth/signin', request.url);
    
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/tickets/:id',
    '/dashboard/:path*',   
    '/bookings/:path*',
    '/checkout/:path*',
  ],
};