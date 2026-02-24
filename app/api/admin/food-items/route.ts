import { NextRequest, NextResponse } from 'next/server';
import { addFoodItem } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, desc, category, price, dietary, imageUrl, rating } = body || {};

    if (!name || !desc || !category || typeof price !== 'number' || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const item = await addFoodItem({
      name,
      desc,
      category,
      price,
      dietary: Array.isArray(dietary) ? dietary : [],
      imageUrl,
      rating: typeof rating === 'number' ? rating : 0,
      active: true,
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error('Create food item error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
