import { NextResponse } from 'next/server';
import { z } from 'zod';
import clientPromise from '@/lib/mongodb';

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(5, "Message must be at least 5 characters long."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedContact = contactSchema.safeParse(body);

    if (!parsedContact.success) {
      return NextResponse.json({ message: 'Invalid data', errors: parsedContact.error.errors }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('get_in_touch');
    await collection.insertOne(parsedContact.data);

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ message: 'Error sending message' }, { status: 500 });
  }
}
