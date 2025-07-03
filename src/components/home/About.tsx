import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function About() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
              Our Passion for the Pedal
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              At Velocity Rides, we believe that the best way to experience the world is on two wheels. Born from a love for cycling and adventure, our mission is to provide top-quality bikes and exceptional service to fuel your journey.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether you're a seasoned pro or a casual rider, we have the perfect bike for you. Our fleet is meticulously maintained, and our team is always ready to share their favorite routes and tips.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Learn More About Us</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Bike workshop"
                data-ai-hint="bike workshop"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
