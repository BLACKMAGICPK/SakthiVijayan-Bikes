import { Star, StarHalf } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Testimonial } from '@/lib/types';

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-yellow-500">
      {Array.from({ length: 5 }, (_, i) => {
        const ratingValue = i + 1;
        if (rating >= ratingValue) {
          return <Star key={i} className="h-5 w-5 fill-current" />;
        }
        if (rating > i && rating < ratingValue) {
          return <StarHalf key={i} className="h-5 w-5 fill-current" />;
        }
        return <Star key={i} className="h-5 w-5 text-gray-300" />;
      })}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <Card className="flex h-full flex-col justify-between rounded-lg bg-card shadow-lg">
            <CardHeader>
                <Rating rating={testimonial.rating} />
            </CardHeader>
            <CardContent>
                <p className="text-base text-muted-foreground">"{testimonial.text}"</p>
            </CardContent>
            <CardFooter>
                <div className="flex items-center">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">What Our Riders Say</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We're proud to have happy riders from all over the world. Here's what they have to say.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
