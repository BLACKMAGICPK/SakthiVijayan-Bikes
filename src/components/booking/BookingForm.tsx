'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

import type { Bike } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  bikeId: z.string({ required_error: "Please select a bike." }),
  pickupDate: z.date({ required_error: "A pick-up date is required." }),
  returnDate: z.date({ required_error: "A return date is required." }),
  pickupLocation: z.string().min(3, { message: "Pickup location is required." }),
}).refine(data => data.returnDate > data.pickupDate, {
    message: "Return date must be after pick-up date.",
    path: ["returnDate"],
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  bikes: Bike[];
}

export default function BookingForm({ bikes }: BookingFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            name: '',
            phone: '',
            pickupLocation: 'Auroville Main Road, Kuyilappalayam',
            bikeId: searchParams.get('bikeId') || undefined,
        },
    });

    async function onSubmit(data: BookingFormValues) {
        setIsLoading(true);
        const selectedBike = bikes.find(bike => String(bike.id) === data.bikeId);

        if (!selectedBike) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'Selected bike not found. Please try again.',
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    bikeName: selectedBike.name,
                    pickupDate: data.pickupDate.toISOString(),
                    returnDate: data.returnDate.toISOString(),
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to create booking');
            }
            router.push('/thank-you');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'There was a problem with your booking.';
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: `${errorMessage}. Please try again.`,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl><Input placeholder="10-digit phone number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <FormField control={form.control} name="bikeId" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bike</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a bike to rent" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {bikes.map(bike => (
                                    <SelectItem key={bike.id} value={String(bike.id)}>
                                        {bike.name} (₹{bike.pricePerDay}/day)
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <FormField control={form.control} name="pickupDate" render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Pickup Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} initialFocus />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="returnDate" render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Return Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < (form.getValues("pickupDate") || new Date())} initialFocus />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <FormField control={form.control} name="pickupLocation" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Pickup Location</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                   {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} 
                   Confirm Booking
                </Button>
            </form>
        </Form>
    );
}
