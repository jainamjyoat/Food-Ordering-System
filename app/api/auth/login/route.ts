import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const usersFile = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Get all users
function getUsers(): Map<string, { email: string; password: string; name: string; phone: string }> {
  ensureDataDir();
  try {
    if (fs.existsSync(usersFile)) {
      const data = fs.readFileSync(usersFile, 'utf-8');
      const users = JSON.parse(data);
      return new Map(Object.entries(users));
    }
  } catch (error) {
    console.error('Error reading users file:', error);
  }
  return new Map();
}

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

    const users = getUsers();

    // Check if user exists
    const user = users.get(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password (in production, use bcrypt or similar)
    if (user.password !== password) {
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
