import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Heart, Clock, ChevronRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Restaurant {
  id: string;
  name: string;
  description: string | null;
  cuisine_type: string | null;
  address: string | null;
}

export const DiscoverRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{ full_name?: string } | null>(null);

  useEffect(() => {
    const fetchUserAndRestaurants = async () => {
      try {
        // Fetch user data
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single();
          setUserData(profile);
        }

        // Fetch restaurants
        const { data, error } = await supabase
          .from('restaurants')
          .select('*');
        
        if (error) {
          console.error('Error fetching restaurants:', error);
          return;
        }

        setRestaurants(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndRestaurants();
  }, []);

  const renderHorizontalSection = (title: string, items: Restaurant[]) => (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button variant="ghost" size="sm" className="text-primary">
          See all <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4">
          {items.map((restaurant) => (
            <Card key={restaurant.id} className="w-[300px] shrink-0">
              <div className="relative h-40">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                  alt={restaurant.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/50 backdrop-blur-sm hover:bg-white/75"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold truncate">{restaurant.name}</h4>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  4.5 · {restaurant.cuisine_type}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-[400px] w-full rounded-lg" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[300px] rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          alt="Featured restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Hi {userData?.full_name || 'there'}, here's what's trending today!
          </h1>
          <p className="text-lg opacity-90">Discover the best restaurants near you</p>
        </div>
      </div>

      {/* Horizontal Sections */}
      {renderHorizontalSection("Trending Now", restaurants)}
      {renderHorizontalSection("Recommended for You", restaurants)}
      {renderHorizontalSection("New in Your Area", restaurants)}

      {/* Restaurant Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">All Restaurants</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
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
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{restaurant.name}</span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm">4.5</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {restaurant.description || "Experience the finest dining experience."}
                </p>
                {restaurant.address && (
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="truncate">{restaurant.address}</span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-4">
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    20-30 min
                  </Badge>
                  <Button size="sm">Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};