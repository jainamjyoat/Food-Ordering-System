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

// Save users
function saveUsers(users: Map<string, { email: string; password: string; name: string; phone: string }>) {
  ensureDataDir();
  const usersObj = Object.fromEntries(users);
  fs.writeFileSync(usersFile, JSON.stringify(usersObj, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, phone } = body;

    // Validation
    if (!email || !password || !name || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const users = getUsers();

    // Check if user already exists
    if (users.has(email)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Store user (in production, hash the password)
    users.set(email, { email, password, name, phone });
    saveUsers(users);

    return NextResponse.json(
      { 
        message: 'Account created successfully',
        user: { email, name, phone }
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
