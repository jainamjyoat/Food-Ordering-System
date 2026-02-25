import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, addUser } from '@/lib/db';
import { hashPassword, signJwt } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, phone } = body;
    const role = body.role === 'admin' ? 'admin' : 'user';

    // Validation
    if (!email || !password || !name || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password and store user
    const passwordHash = await hashPassword(password);
    const newUser = await addUser({ email, password: passwordHash, name, phone, role });

    const token = signJwt({ sub: newUser._id.toString(), email: newUser.email, role: newUser.role, name: newUser.name });
    const res = NextResponse.json(
      { 
        message: 'Account created successfully',
        user: { email: newUser.email, name: newUser.name, phone: newUser.phone, role: newUser.role },
        token,
      },
      { status: 201 }
    );

    res.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
