import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export default async function middleware(request: NextRequest) {
    const authToken = (await cookies()).get("authToken")?.value || "";
    const { pathname, origin } = request.nextUrl;

    // Kalau user sudah login → blokir akses ke /auth/login
    if (authToken && pathname.startsWith('/auth/login')) {
        return NextResponse.redirect(new URL('/dashboard', origin));
    }

    // Kalau user belum login → blokir akses ke /dashboard
    if (!authToken && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/login', origin));
    }

    // Lanjutkan request normal
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/auth/login',
    ],
};
