import { NextResponse } from 'next/server';
import { z } from 'zod';
import clientPromise from '@/lib/mongodb';

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  bikeId: z.string(),
  pickupDate: z.string().datetime(),
  returnDate: z.string().datetime(),
  pickupLocation: z.string().min(1, "Pickup location is required."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBooking = bookingSchema.safeParse(body);

    if (!parsedBooking.success) {
      return NextResponse.json({ message: 'Invalid booking data', errors: parsedBooking.error.errors }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(); // Use the database from the connection string
    const collection = db.collection('booking_details');
    await collection.insertOne(parsedBooking.data);

    return NextResponse.json({ message: 'Booking successful!', booking: parsedBooking.data }, { status: 201 });
  } catch (error) {
    console.error('Booking API Error:', error);
    const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred. Please check the server logs.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
