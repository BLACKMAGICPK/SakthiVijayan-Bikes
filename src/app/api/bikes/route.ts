import { NextResponse } from 'next/server';
import { bikes } from '@/lib/data';

export async function GET() {
  try {
    // In a real application, you would fetch this from a database
    return NextResponse.json(bikes);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching bikes' }, { status: 500 });
  }
}
