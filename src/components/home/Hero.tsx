import Link from 'next/link';
import { ArrowRight, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
        <Image
          src="https://i.ibb.co/S7PDXtkR/hero.png"
          alt="Black sports bike on a road"
          data-ai-hint="sports bike road"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex h-full items-center justify-center p-4 text-center">
            <div className="container max-w-4xl rounded-[3rem] bg-white/20 p-8 text-foreground backdrop-blur-md sm:p-12">
                <h1 className="font-headline text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
                    Rent a Bike in <span className="text-primary">Auroville</span>.
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground md:text-xl">
                    Explore Auroville and its surroundings on two wheels. We offer a variety of well-maintained scooters and bikes for rent.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button asChild size="lg">
                        <Link href="/booking">
                            Book Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button asChild variant="secondary" size="lg">
                        <Link href="/bikes">
                            See Our Bikes <MoveRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    </section>
  );
}
