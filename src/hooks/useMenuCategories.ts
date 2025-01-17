import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMenuCategories = (restaurantId: string | null) => {
  return useQuery({
    queryKey: ["menuCategories", restaurantId],
    queryFn: async () => {
      if (!restaurantId) throw new Error("Restaurant ID is required");
      
      const { data, error } = await supabase
        .from("menu_categories")
        .select("*")
        .eq("restaurant_id", restaurantId)
        .order("name");

      if (error) throw error;
      return data;
    },
    enabled: !!restaurantId,
  });
};