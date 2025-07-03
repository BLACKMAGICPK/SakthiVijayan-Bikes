import { NextResponse } from 'next/server';
import { z } from 'zod';

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
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

    // In a real application, you would save this to a database
    console.log('New Booking Received:', parsedBooking.data);

    return NextResponse.json({ message: 'Booking successful!', booking: parsedBooking.data }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ message: 'Error creating booking' }, { status: 500 });
  }
}
