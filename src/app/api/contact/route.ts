import { NextResponse } from 'next/server';
import { z } from 'zod';
import clientPromise from '@/lib/mongodb';
import { sendEmail } from '@/lib/nodemailer';

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

    // Send email notification
    try {
        console.log("CONTACT API: Attempting to send email notification...");
        const { firstName, lastName, email, message } = parsedContact.data;
        await sendEmail({
            subject: `📨 New Contact Form Submission Received`,
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                  <h2 style="color: #333;">📨 New Contact Form Submission Received</h2>
                  <p>Hi Admin,</p>
                  <p>You’ve received a new enquiry from the contact form on your website. Here are the details:</p>
                  <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 20px; border: 1px solid #ddd;">
                      <tr style="border-bottom: 1px solid #ddd;">
                          <td style="padding: 12px; font-weight: bold; background-color: #f9f9f9; border-right: 1px solid #ddd;">Name:</td>
                          <td style="padding: 12px;">${firstName} ${lastName}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #ddd;">
                          <td style="padding: 12px; font-weight: bold; background-color: #f9f9f9; border-right: 1px solid #ddd;">Email:</td>
                          <td style="padding: 12px;">${email}</td>
                      </tr>
                      <tr>
                          <td style="padding: 12px; font-weight: bold; background-color: #f9f9f9; border-right: 1px solid #ddd;">Message:</td>
                          <td style="padding: 12px;">${message}</td>
                      </tr>
                  </table>
                  <p style="margin-top: 20px;">Please follow up with the sender as soon as possible.</p>
              </div>
            `,
        });
        console.log("CONTACT API: Email notification sent successfully.");
    } catch (emailError) {
        console.error("CONTACT API: Failed to send email notification:", emailError);
    }

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 201 });
  } catch (error: any) {
    console.error('--- CONTACT API: FATAL ERROR ---');
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
