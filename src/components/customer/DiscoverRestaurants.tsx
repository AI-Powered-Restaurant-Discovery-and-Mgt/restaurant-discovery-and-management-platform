import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Heart, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CustomerTopNav } from "./CustomerTopNav";

interface Restaurant {
  id: string;
  name: string;
  description: string | null;
  cuisine_type: string | null;
  address: string | null;
}

const mockRestaurants = [
  {
    id: "1",
    name: "Sakura Sushi House",
    description: "Best sushi in town!",
    cuisine_type: "Japanese",
    address: "123 Main St",
    rating: 4.8,
    price_range: "$$$",
    distance: "0.8 miles",
    reviews: 245,
    tags: ["Kid-Friendly", "Date Night"],
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
  },
  {
    id: "2",
    name: "Bella Italia",
    description: "Authentic Italian cuisine",
    cuisine_type: "Italian",
    address: "456 Oak Ave",
    rating: 4.6,
    price_range: "$$",
    distance: "1.2 miles",
    reviews: 189,
    tags: ["Romantic", "Wine Selection"],
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
  },
  {
    id: "3",
    name: "The Green Table",
    description: "Farm-to-table vegetarian",
    cuisine_type: "Vegetarian",
    address: "789 Pine St",
    rating: 4.7,
    price_range: "$$",
    distance: "0.5 miles",
    reviews: 156,
    tags: ["Vegan Options", "Healthy"],
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
  },
  {
    id: "4",
    name: "Spice Route",
    description: "Authentic Indian flavors",
    cuisine_type: "Indian",
    address: "321 Maple Dr",
    rating: 4.5,
    price_range: "$$",
    distance: "1.5 miles",
    reviews: 203,
    tags: ["Spicy", "Group-Friendly"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  },
];

const cuisineFilters = [
  "All", "Japanese", "Italian", "Indian", "Mexican", "Chinese", "Thai", "American"
];

export const DiscoverRestaurants = () => {
  const [userData, setUserData] = useState<{ full_name?: string } | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single();
          setUserData(profile);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  const renderRestaurantCard = (restaurant: typeof mockRestaurants[0]) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/50 backdrop-blur-sm hover:bg-white/75"
        >
          <Heart className="h-4 w-4" />
        </Button>
        {restaurant.cuisine_type && (
          <Badge className="absolute top-2 left-2">
            {restaurant.cuisine_type}
          </Badge>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{restaurant.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm">{restaurant.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{restaurant.description}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{restaurant.distance}</span>
          <span className="mx-2">•</span>
          <span>{restaurant.price_range}</span>
          <span className="mx-2">•</span>
          <span>{restaurant.reviews} reviews</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {restaurant.tags.map((tag) => (
            <Badge variant="secondary" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Button size="sm">Book Now</Button>
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      </div>
    </Card>
  );

  const renderCarouselSection = (title: string, items: typeof mockRestaurants) => (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {items.map((restaurant) => (
            <CarouselItem key={restaurant.id} className="md:basis-1/2 lg:basis-1/3">
              {renderRestaurantCard(restaurant)}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <CustomerTopNav />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Hi {userData?.full_name || 'there'}, here's what's trending today!
          </h1>
          <p className="text-muted-foreground">
            Discover new flavors and experiences
          </p>
        </div>

        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-4">
            {cuisineFilters.map((cuisine) => (
              <Button
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                onClick={() => setSelectedCuisine(cuisine)}
                className="whitespace-nowrap"
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Restaurant */}
        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="relative h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80"
                alt="Featured restaurant"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Featured: The Gourmet Kitchen</h2>
                <p className="text-lg mb-4">Experience fine dining at its best</p>
                <Button size="lg" className="bg-white text-black hover:bg-white/90">
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {renderCarouselSection("Trending Now", mockRestaurants)}
        {renderCarouselSection("Recommended for You", mockRestaurants)}
        {renderCarouselSection("New in Your Area", mockRestaurants)}
        {renderCarouselSection("Popular This Week", mockRestaurants)}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockRestaurants.map((restaurant) => (
            <div key={restaurant.id}>
              {renderRestaurantCard(restaurant)}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};