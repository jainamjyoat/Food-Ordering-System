import { NextRequest, NextResponse } from 'next/server';
import { getAllFoodItems } from '@/lib/db';

export async function GET(_request: NextRequest) {
  try {
    const items = await getAllFoodItems();
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error('GET /api/food-items error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
