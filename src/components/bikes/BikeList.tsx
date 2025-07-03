'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Bike } from '@/lib/types';
import BikeCard from '../shared/BikeCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '../ui/skeleton';
import { Label } from '../ui/label';

function BikeListSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[240px] w-full rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function BikeList() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [typeFilter, setTypeFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState([700]);
  
  useEffect(() => {
    async function fetchBikes() {
      try {
        setLoading(true);
        const response = await fetch('/api/bikes');
        const data = await response.json();
        setBikes(data);
        setFilteredBikes(data);
      } catch (error) {
        console.error('Failed to fetch bikes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBikes();
  }, []);

  const bikeTypes = useMemo(() => ['all', ...Array.from(new Set(bikes.map(b => b.type)))], [bikes]);
  const bikeBrands = useMemo(() => ['all', ...Array.from(new Set(bikes.map(b => b.brand)))], [bikes]);

  useEffect(() => {
    let tempBikes = [...bikes];

    if (typeFilter !== 'all') {
      tempBikes = tempBikes.filter(bike => bike.type === typeFilter);
    }
    if (brandFilter !== 'all') {
        tempBikes = tempBikes.filter(bike => bike.brand === brandFilter);
    }
    tempBikes = tempBikes.filter(bike => bike.pricePerDay <= priceFilter[0]);
    
    setFilteredBikes(tempBikes);
  }, [typeFilter, brandFilter, priceFilter, bikes]);

  return (
    <div>
        <div className="mb-8 grid grid-cols-1 gap-6 rounded-lg border bg-card p-6 md:grid-cols-3">
            <div>
                <Label htmlFor="type-filter">Bike Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger id="type-filter">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        {bikeTypes.map(type => <SelectItem key={type} value={type}>{type === 'all' ? 'All Types' : type}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="brand-filter">Brand</Label>
                <Select value={brandFilter} onValueChange={setBrandFilter}>
                    <SelectTrigger id="brand-filter">
                        <SelectValue placeholder="Filter by brand" />
                    </SelectTrigger>
                    <SelectContent>
                        {bikeBrands.map(brand => <SelectItem key={brand} value={brand}>{brand === 'all' ? 'All Brands' : brand}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="price-filter">Max Price Per Day: <span className="font-bold text-primary">₹{priceFilter[0]}</span></Label>
                <Slider id="price-filter" min={300} max={700} step={50} value={priceFilter} onValueChange={setPriceFilter} />
            </div>
        </div>

      {loading ? (
        <BikeListSkeleton />
      ) : filteredBikes.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredBikes.map(bike => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <h3 className="font-headline text-2xl">No Bikes Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters to find your perfect ride.</p>
        </div>
      )}
    </div>
  );
}
