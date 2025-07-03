export interface Bike {
  id: number;
  name: string;
  type: 'Scooter' | 'Geared Bike';
  brand: string;
  pricePerHour: number;
  pricePerDay: number;
  image: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface Booking {
  name: string;
  phone: string;
  bikeId: number;
  pickupDate: Date;
  returnDate: Date;
  pickupLocation: string;
}
