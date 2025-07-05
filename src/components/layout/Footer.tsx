import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3">
              <Image src="https://i.ibb.co/5g4tTZBw/Copilot-20250703-123937.png" alt="Sakthi Vijayan Bike Rentals Logo" width={40} height={40} data-ai-hint="logo" className="rounded-md" />
              <span className="font-headline text-xl font-bold">Sakthi Vijayan Bike Rentals</span>
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
            <ul className="mt-4 space-y-3">
               <li>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=XRRM%2B75+Kuilapalayam,+Tamil+Nadu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block relative h-24 w-full cursor-pointer overflow-hidden rounded-md border hover:opacity-80 transition-opacity"
                  aria-label="View our location on Google Maps"
                >
                  <Image
                    src="https://i.ibb.co/6y43JqY/map-image.png"
                    alt="Map showing the location of Sakthi Vijayan Bike Rentals"
                    data-ai-hint="map location"
                    fill
                    className="object-cover"
                  />
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Auroville Main Road, Kuyilappalayam – 605101
                </p>
              </li>
              <li>
                <a href="mailto:svel58844@gmail.com" className="text-sm text-muted-foreground hover:text-primary">
                  Email: svel58844@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:8778254658" className="text-sm text-muted-foreground hover:text-primary">
                  Phone: 87782 54658
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>© Developed by Logic Loopers | Turning Logics into Launches</p>
           <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin /></Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
