import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, addUser } from '@/lib/db';

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

    // Store user (in production, hash the password)
    const newUser = await addUser({ email, password, name, phone, role });

    return NextResponse.json(
      { 
        message: 'Account created successfully',
        user: { email: newUser.email, name: newUser.name, phone: newUser.phone, role: newUser.role }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
