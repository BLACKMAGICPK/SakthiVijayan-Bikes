import { NextResponse } from 'next/server';
import { z } from 'zod';
import clientPromise from '@/lib/mongodb';

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  bikeId: z.string(),
  bikeName: z.string().min(1, "Bike name is required."),
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
  } catch (error: any) {
    console.error('--- BOOKING API: FATAL ERROR ---');
    console.error(error); // Log the full error object

    // Check for a specific MongoDB connection timeout error
    if (error.name === 'MongoServerSelectionError') {
      return NextResponse.json({
          message: 'Could not connect to database.',
          troubleshooting: 'This is often caused by a firewall or an IP address not being whitelisted. Please ensure the server\'s IP address is on the IP Access List in your MongoDB Atlas settings.'
      }, { status: 500 });
    }
    
    const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
    return NextResponse.json({ message: `Server Error: ${errorMessage}` }, { status: 500 });
  }
}
