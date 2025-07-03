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
  console.log("--- BOOKING API: REQUEST RECEIVED ---");
  try {
    const body = await request.json();
    console.log("BOOKING API: Request body parsed:", body);

    const parsedBooking = bookingSchema.safeParse(body);

    if (!parsedBooking.success) {
      console.error("BOOKING API: Zod validation failed:", parsedBooking.error.errors);
      return NextResponse.json({ message: 'Invalid booking data', errors: parsedBooking.error.errors }, { status: 400 });
    }
    console.log("BOOKING API: Zod validation successful.");

    console.log("BOOKING API: Attempting to connect to MongoDB...");
    const client = await clientPromise;
    console.log("BOOKING API: MongoDB client promise resolved.");

    const db = client.db();
    console.log(`BOOKING API: Using database: ${db.databaseName}`);

    const collection = db.collection('booking_details');
    console.log(`BOOKING API: Using collection: ${collection.collectionName}`);

    console.log("BOOKING API: Attempting to insert document:", parsedBooking.data);
    const insertResult = await collection.insertOne(parsedBooking.data);
    console.log("BOOKING API: Document inserted successfully:", insertResult.insertedId);

    return NextResponse.json({ message: 'Booking successful!', booking: parsedBooking.data }, { status: 201 });
  } catch (error) {
    console.error('--- BOOKING API: FATAL ERROR ---');
    console.error(error); // Log the full error object
    const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
    return NextResponse.json({ message: `Server Error: ${errorMessage}` }, { status: 500 });
  }
}
