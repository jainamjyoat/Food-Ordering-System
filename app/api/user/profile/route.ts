import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, updateUser } from '@/lib/db';

function getEmailFromCookie(req: NextRequest): string | null {
  const cookie = req.cookies.get('auth_token');
  return cookie?.value || null;
}

export async function GET(request: NextRequest) {
  try {
    const email = getEmailFromCookie(request);
    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Exclude sensitive fields
    const { password: _pw, ...safe } = user as any;
    return NextResponse.json({ user: safe }, { status: 200 });
  } catch (error) {
    console.error('GET /api/user/profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const email = getEmailFromCookie(request);
    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Find user first
    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Allow updating specific fields only
    const allowed: any = {};
    if (typeof body.name === 'string') allowed.name = body.name;
    if (typeof body.phone === 'string') allowed.phone = body.phone;
    if (typeof body.picture === 'string') allowed.picture = body.picture;
    if (Array.isArray(body.addresses)) allowed.addresses = body.addresses; // [{label, line1, line2, city, state, zip, country}]

    // Optional: change password (demo only, no hashing)
    if (typeof body.password === 'string' && body.password.trim()) {
      allowed.password = body.password.trim();
    }

    const updated = await updateUser(user._id.toString(), allowed);
    const { password: _pw, ...safe } = updated as any;
    return NextResponse.json({ user: safe }, { status: 200 });
  } catch (error) {
    console.error('PUT /api/user/profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}