import BikeList from "@/components/bikes/BikeList";

export const metadata = {
  title: 'Our Bikes | Sakthi Vijayan Bike Rentals',
  description: 'Browse our collection of high-quality mountain, road, and hybrid bikes.',
};

export default function BikesPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Our Fleet of Bikes</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Find the perfect bike for your next adventure. Use the filters to narrow down your search.
          </p>
        </div>
        <BikeList />
      </div>
    </div>
  );
}
