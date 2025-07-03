import Image from 'next/image';
import Link from 'next/link';
import { Bike as BikeIcon, Tag } from 'lucide-react';
import type { Bike } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../ui/badge';

interface BikeCardProps {
  bike: Bike;
  className?: string;
}

export default function BikeCard({ bike, className }: BikeCardProps) {
  return (
    <Card className={cn('flex h-full flex-col overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1', className)}>
      <CardHeader className="relative h-60 w-full p-0">
        <Image
          src={bike.image}
          alt={bike.name}
          data-ai-hint={`${bike.type.toLowerCase()} bike white background`}
          fill
          className="object-cover"
        />
        <Badge variant="secondary" className="absolute right-2 top-2">{bike.type}</Badge>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-6">
        <CardTitle className="font-headline text-2xl">{bike.name}</CardTitle>
        <p className="mt-2 text-sm text-muted-foreground">{bike.brand}</p>
        <p className="mt-4 flex-1 text-sm">{bike.description}</p>
        <div className="mt-4 flex items-center justify-center">
            <p className="text-lg font-bold text-primary">₹{bike.pricePerDay}</p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full" variant="default">
          <Link href={`/booking?bikeId=${bike.id}`}>Rent Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
