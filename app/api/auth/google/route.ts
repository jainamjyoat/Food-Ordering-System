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
function getUsers(): Map<string, { email: string; password: string; name: string; phone: string; googleId?: string }> {
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

// Save users
function saveUsers(users: Map<string, { email: string; password: string; name: string; phone: string; googleId?: string }>) {
  ensureDataDir();
  const usersObj = Object.fromEntries(users);
  fs.writeFileSync(usersFile, JSON.stringify(usersObj, null, 2));
}

// Decode JWT token from Google
function decodeGoogleToken(token: string) {
  try {
    // This is a simplified version - in production, verify the token signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    const decoded = JSON.parse(
      Buffer.from(parts[1], 'base64').toString('utf-8')
    );
    
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { credential } = body;

    if (!credential) {
      return NextResponse.json(
        { error: 'Google credential is required' },
        { status: 400 }
      );
    }

    // Decode the JWT token
    const decoded = decodeGoogleToken(credential);
    
    if (!decoded || !decoded.email) {
      return NextResponse.json(
        { error: 'Invalid Google token' },
        { status: 401 }
      );
    }

    const { email, name, picture, sub: googleId } = decoded;

    const users = getUsers();
    let user = users.get(email);

    // If user doesn't exist, create new user
    if (!user) {
      user = {
        email,
        name: name || 'Google User',
        phone: '',
        password: '', // No password for Google OAuth users
        googleId
      };
      users.set(email, user);
      saveUsers(users);
    } else if (!user.googleId) {
      // Link Google account to existing user
      user.googleId = googleId;
      users.set(email, user);
      saveUsers(users);
    }

    // Create response with user data
    const response = NextResponse.json(
      { 
        message: 'Google login successful',
        user: { email: user.email, name: user.name, phone: user.phone, picture }
      },
      { status: 200 }
    );

    // Set authentication cookie
    response.cookies.set('auth_token', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error('Google login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
