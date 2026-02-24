import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, addUser, updateUser } from '@/lib/db';

// Decode JWT token from Google (simplified; in production verify signature and audience)
function decodeGoogleToken(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    const decoded = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { credential, role } = body || {} as { credential?: string; role?: string };

    if (!credential) {
      return NextResponse.json(
        { error: 'Google credential is required' },
        { status: 400 }
      );
    }

    // Normalize role
    const requestedRole = role === 'admin' || role === 'customer' ? role : 'customer';

    // Decode the JWT token
    const decoded = decodeGoogleToken(credential);
    if (!decoded || !decoded.email) {
      return NextResponse.json(
        { error: 'Invalid Google token' },
        { status: 401 }
      );
    }

    const { email, name, sub: googleId, picture } = decoded as { email: string; name?: string; sub: string; picture?: string };

    // Find existing user by email in MongoDB
    let user = await findUserByEmail(email);

    if (!user) {
      // Create new user with role
      user = await addUser({
        email,
        name: name || 'Google User',
        phone: '',
        password: '', // No password for Google OAuth users
        googleId,
        role: requestedRole,
      });
    } else {
      // Update user: attach googleId if missing; set role if not set yet
      const updates: Record<string, unknown> = {};
      if (!user.googleId) updates.googleId = googleId;
      if (!user.role) updates.role = requestedRole;

      if (Object.keys(updates).length > 0) {
        user = await updateUser(String(user._id), updates as any);
      }
    }

    const response = NextResponse.json(
      {
        message: 'Google login successful',
        user: { email: user.email, name: user.name, phone: user.phone, role: user.role, picture }
      },
      { status: 200 }
    );

    // Set authentication cookie
    response.cookies.set('auth_token', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
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
