import BookingForm from "@/components/booking/BookingForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: 'Book Your Bike | Sakthi Vijayan Bike Rental',
  description: 'Complete your booking in just a few simple steps.',
};

const terms = [
    "Submit a hard or soft copy of a valid ID proof",
    "Advance payment is required",
    "Provide phone number and address at the time of booking",
    "Mention the return date clearly",
    "Any damage to the bike must be covered by the customer",
    "Fuel level must be returned the same as when the bike was taken",
];

export default function BookingPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="text-center lg:text-left mb-12">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Book Your Ride</h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground lg:mx-0">
                You're just a few steps away from your next adventure. Fill out the form below to reserve your bike.
              </p>
            </div>
            <Card>
              <CardContent className="p-6 sm:p-8">
                <BookingForm />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 mt-0 lg:mt-28">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                        {terms.map((term, i) => <li key={i}>{term}</li>)}
                    </ul>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
