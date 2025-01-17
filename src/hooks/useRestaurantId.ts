import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useRestaurantId = () => {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setError(new Error("User not authenticated"));
          setIsLoading(false);
          return;
        }

        const { data: restaurant, error: restaurantError } = await supabase
          .from("restaurants")
          .select("id")
          .eq("owner_id", user.id)
          .single();

        if (restaurantError) {
          throw restaurantError;
        }

        setRestaurantId(restaurant.id);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch restaurant ID"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurantId();
  }, []);

  return { restaurantId, isLoading, error };
};