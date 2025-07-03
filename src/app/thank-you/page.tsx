import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Thank You! | Velocity Rides',
  description: 'Your booking has been confirmed.',
};

export default function ThankYouPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto flex min-h-[calc(100vh-12rem)] max-w-2xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full text-center shadow-lg">
          <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="font-headline text-3xl mt-4">Thank You for Your Booking!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your bike has been reserved. We've sent a confirmation email with all the details of your rental.
            </p>
            <p className="text-muted-foreground">
              We look forward to seeing you and hope you have an amazing ride!
            </p>
            <div className="flex justify-center gap-4 pt-4">
                <Button asChild>
                    <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/bikes">Explore More Bikes</Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
