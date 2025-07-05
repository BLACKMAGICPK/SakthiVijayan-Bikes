import { NextResponse } from 'next/server';
import { z } from 'zod';
import clientPromise from '@/lib/mongodb';
import { sendEmail } from '@/lib/nodemailer';

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

    // Send email notification
    try {
      console.log("BOOKING API: Attempting to send email notification...");
      const { name, phone, bikeName, pickupDate, returnDate, pickupLocation } = parsedBooking.data;
      await sendEmail({
          subject: `🚨 New Bike Booking Received via Website`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">🚨 New Bike Booking Received via Website</h2>
                <p>Hi Admin,</p>
                <p>You have received a new bike booking from your website. Below are the booking details:</p>
                <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 20px; border: 1px solid #ddd;">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 12px; font-weight: bold; background-color: #f9f9f9; border-right: 1px solid #ddd;">Name:</td>
                        <td style="padding: 12px;">${name}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 12px; font-weight: bold; background-color: #f9f9f9; border-right: 1px solid #ddd;">Phone:</td>
                        <td style="padding: 12px;">${phone}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 12px; font-weight: bold; background-color: #f9f9f9; border-right: 1px solid #ddd;">Bike:</td>
                        <td style="padding: 12px;">${bikeName}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 12px; font-weight: bold; background-color: #f9f9f9; border-right: 1px solid #ddd;">Pickup Date:</td>
                        <td style="padding: 12px;">${new Date(pickupDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 12px; font-weight: bold; background-color: #f9f9f9; border-right: 1px solid #ddd;">Return Date:</td>
                        <td style="padding: 12px;">${new Date(returnDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; font-weight: bold; background-color: #f9f9f9; border-right: 1px solid #ddd;">Pickup Location:</td>
                        <td style="padding: 12px;">${pickupLocation}</td>
                    </tr>
                </table>
                <p style="margin-top: 20px;">Please remember to check your admin dashboard for all booking details.</p>
            </div>
          `,
      });
      console.log("BOOKING API: Email notification sent successfully.");
    } catch (emailError) {
      // Log the email error but don't fail the entire request,
      // as the booking was successfully saved to the DB.
      console.error("BOOKING API: Failed to send email notification:", emailError);
    }

    return NextResponse.json({ message: 'Booking successful!', booking: parsedBooking.data }, { status: 201 });
  } catch (error: any) {
    console.error('--- BOOKING API: FATAL ERROR ---');
    console.error(error);

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
