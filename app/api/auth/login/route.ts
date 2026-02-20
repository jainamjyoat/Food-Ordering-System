import { NextRequest, NextResponse } from 'next/server';
import { verifyUserCredentials } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Verify user credentials using db
    const user = await verifyUserCredentials(email, password);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create response with user data
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: { email: user.email, name: user.name, phone: user.phone }
      },
      { status: 200 }
    );

    // Set a simple auth cookie (in production, use secure, httpOnly cookies)
    response.cookies.set('auth_token', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
