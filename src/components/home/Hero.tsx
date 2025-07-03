import Link from 'next/link';
import { ArrowRight, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Cyclist riding on a scenic route"
          data-ai-hint="cyclist scenic route"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative z-10 flex h-full items-center justify-center text-center">
            <div className="container max-w-4xl text-white">
                <h1 className="font-headline text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
                    Embrace the <span className="text-primary">Journey</span>.
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-200 md:text-xl">
                    Discover your next adventure with our premium bike rentals. From rugged mountain trails to scenic city paths, your perfect ride awaits.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button asChild size="lg">
                        <Link href="/booking">
                            Book Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
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
