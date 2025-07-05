import nodemailer from 'nodemailer';

// WARNING: Hardcoding credentials is not secure and not recommended for production.
// These should be stored in environment variables for better security.
const EMAIL_USER = 'sakthivijayan67@gmail.com';
const EMAIL_PASS = 'xsjfithtmqhxymaw';
const EMAIL_TO = 'svel58844@gmail.com';

if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn("Email credentials are not configured. Emails will not be sent. Please set EMAIL_USER and EMAIL_PASS in your environment variables.");
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS, // This should be a Gmail App Password
  },
});

interface MailOptions {
  to?: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to = EMAIL_TO, subject, html }: MailOptions) {
  // Do not send emails if credentials are not set
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.log("Skipping email send: credentials not configured.");
    return Promise.resolve({ message: "Email not sent because credentials are not configured." });
  }

  try {
    const info = await transporter.sendMail({
      from: `"Sakthi Vijayan Bike Rentals" <${EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log('Email sent successfully: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    // Re-throw the error so the calling API route can decide how to handle it.
    throw new Error('Failed to send notification email.');
  }
}
