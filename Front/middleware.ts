import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  
  const token = request.cookies.get('token');

  if (!token) {
    
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/relatorio/:path*', '/produtos/:path*', '/dashboard/:path*'],
};
