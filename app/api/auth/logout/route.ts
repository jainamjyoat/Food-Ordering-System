import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {
  const res = NextResponse.json({ message: 'Logged out' }, { status: 200 });
  // Clear the auth cookie
  res.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return res;
}

export async function GET(request: NextRequest) {
  // Also support GET for convenience
  return POST(request);
}
