import Link from 'next/link';
import { Bike, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2">
              <Bike className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold">Velocity Rides</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your adventure on two wheels starts here. Premium bikes for every terrain.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link href="/bikes" className="text-sm text-muted-foreground hover:text-primary">Our Bikes</Link></li>
              <li><Link href="/booking" className="text-sm text-muted-foreground hover:text-primary">Book Now</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>123 Bike Lane, Adventure City</li>
              <li>Email: contact@velocityrides.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Velocity Rides. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
