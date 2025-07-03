import { Key } from 'react';
import { format } from 'date-fns';
import clientPromise from '@/lib/mongodb';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { FileText, Phone, User, Bike, Calendar, MessageSquare, Mail } from 'lucide-react';

async function getBookings() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const bookings = await db.collection('booking_details').find({}).sort({ pickupDate: -1 }).toArray();
    // Convert ObjectId to string for serialization
    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}

async function getContacts() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const contacts = await db.collection('get_in_touch').find({}).sort({ _id: -1 }).toArray();
    // Convert ObjectId to string for serialization
    return JSON.parse(JSON.stringify(contacts));
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return [];
  }
}

export const metadata = {
  title: 'Admin Dashboard | Sakthi Vijayan Bike Rentals',
  description: 'View bookings and contact messages.',
};

export default async function AdminDashboardPage() {
  const bookings = await getBookings();
  const contacts = await getContacts();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Admin Dashboard</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Manage your bookings and view customer messages.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="font-headline text-2xl">Recent Bookings</CardTitle>
                <CardDescription>A list of all bike reservations.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] w-full">
              <Table>
                <TableHeader className="sticky top-0 bg-card">
                  <TableRow>
                    <TableHead><User className="inline-block h-4 w-4 mr-1" /> Name</TableHead>
                    <TableHead><Phone className="inline-block h-4 w-4 mr-1" /> Phone</TableHead>
                    <TableHead><Bike className="inline-block h-4 w-4 mr-1" /> Bike</TableHead>
                    <TableHead><Calendar className="inline-block h-4 w-4 mr-1" /> Pickup</TableHead>
                    <TableHead><Calendar className="inline-block h-4 w-4 mr-1" /> Return</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.length > 0 ? bookings.map((booking: any) => (
                    <TableRow key={booking._id}>
                      <TableCell className="font-medium">{booking.name}</TableCell>
                      <TableCell>{booking.phone}</TableCell>
                      <TableCell>{booking.bikeName}</TableCell>
                      <TableCell>{format(new Date(booking.pickupDate), 'PP')}</TableCell>
                      <TableCell>{format(new Date(booking.returnDate), 'PP')}</TableCell>
                      <TableCell><Badge variant="secondary">{booking.pickupLocation}</Badge></TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">No bookings found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
             <div className="flex items-center gap-4">
              <MessageSquare className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="font-headline text-2xl">Contact Messages</CardTitle>
                <CardDescription>Messages from the "Get in Touch" form.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] w-full">
              <Table>
                <TableHeader className="sticky top-0 bg-card">
                  <TableRow>
                    <TableHead className="w-[200px]"><User className="inline-block h-4 w-4 mr-1" /> Name</TableHead>
                    <TableHead className="w-[250px]"><Mail className="inline-block h-4 w-4 mr-1" /> Email</TableHead>
                    <TableHead><MessageSquare className="inline-block h-4 w-4 mr-1" /> Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.length > 0 ? contacts.map((contact: any) => (
                    <TableRow key={contact._id}>
                      <TableCell className="font-medium">{contact.firstName} {contact.lastName}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.message}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">No messages found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
