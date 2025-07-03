'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/bikes', label: 'Bikes' },
  { href: '/booking', label: 'Booking' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="https://i.ibb.co/5g4tTZBw/Copilot-20250703-123937.png" alt="Velocity Rides Logo" width={32} height={32} data-ai-hint="logo" />
          <span className="font-headline text-xl font-bold">Velocity Rides</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:flex">
            <Link href="/booking">Book Now</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                 <Button asChild>
                    <Link href="/booking">Book Now</Link>
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
