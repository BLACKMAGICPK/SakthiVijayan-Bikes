import BookingForm from "@/components/booking/BookingForm";

export const metadata = {
  title: 'Book Your Bike | Velocity Rides',
  description: 'Complete your booking in just a few simple steps.',
};

export default function BookingPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Book Your Ride</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            You're just a few steps away from your next adventure. Fill out the form below to reserve your bike.
          </p>
        </div>
        <BookingForm />
      </div>
    </div>
  );
}
