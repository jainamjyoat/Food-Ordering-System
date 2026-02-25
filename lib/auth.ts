import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_insecure_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

export type JwtUserPayload = {
  sub: string; // user id
  email: string;
  role?: string;
  name?: string;
};

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signJwt(payload: JwtUserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt(token: string): JwtUserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtUserPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  // Prefer Authorization header: Bearer <token>
  const auth = req.headers.get('authorization') || req.headers.get('Authorization');
  if (auth && auth.startsWith('Bearer ')) {
    return auth.substring('Bearer '.length).trim();
  }
  // Fallback to cookie
  const cookie = req.cookies.get('auth_token');
  if (cookie?.value) return cookie.value;
  return null;
}

export function getUserFromRequest(req: NextRequest): JwtUserPayload | null {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyJwt(token);
}
