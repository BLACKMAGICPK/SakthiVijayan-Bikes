import Link from 'next/link';
import { bikes } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import BikeCard from '../shared/BikeCard';

export default function FeaturedBikes() {
  const featuredBikes = bikes.slice(0, 5);

  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">Featured Bikes</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Check out our most popular rides, perfect for any adventure you have in mind.
          </p>
        </div>
        <div className="mt-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredBikes.map((bike) => (
                <CarouselItem key={bike.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <BikeCard bike={bike} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
        <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
                <Link href="/bikes">View All Bikes</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
