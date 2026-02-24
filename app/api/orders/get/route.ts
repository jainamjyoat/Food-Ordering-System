import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders } from '@/lib/db';

export async function GET(_request: NextRequest) {
  try {
    const orders = await getAllOrders();
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('GET /api/orders error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
