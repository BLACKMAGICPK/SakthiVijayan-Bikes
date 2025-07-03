import { NextResponse } from 'next/server';
import { z } from 'zod';
import clientPromise from '@/lib/mongodb';

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export async function POST(request: Request) {
  console.log("--- CONTACT API: REQUEST RECEIVED ---");
  try {
    const body = await request.json();
    console.log("CONTACT API: Request body parsed:", body);

    const parsedContact = contactSchema.safeParse(body);

    if (!parsedContact.success) {
      console.error("CONTACT API: Zod validation failed:", parsedContact.error.errors);
      return NextResponse.json({ message: 'Invalid data', errors: parsedContact.error.errors }, { status: 400 });
    }
    console.log("CONTACT API: Zod validation successful.");

    console.log("CONTACT API: Attempting to connect to MongoDB...");
    const client = await clientPromise;
    console.log("CONTACT API: MongoDB client promise resolved.");

    const db = client.db();
    console.log(`CONTACT API: Using database: ${db.databaseName}`);

    const collection = db.collection('get_in_touch');
    console.log(`CONTACT API: Using collection: ${collection.collectionName}`);

    console.log("CONTACT API: Attempting to insert document:", parsedContact.data);
    const insertResult = await collection.insertOne(parsedContact.data);
    console.log("CONTACT API: Document inserted successfully:", insertResult.insertedId);

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 201 });
  } catch (error: any) {
    console.error('--- CONTACT API: FATAL ERROR ---');
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
