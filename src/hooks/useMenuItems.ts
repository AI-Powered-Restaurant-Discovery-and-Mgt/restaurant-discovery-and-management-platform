import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMenuItems = (
  restaurantId: string | null,
  categoryId: string | null = null,
  searchQuery: string = ""
) => {
  return useQuery({
    queryKey: ["menuItems", restaurantId, categoryId, searchQuery],
    queryFn: async () => {
      if (!restaurantId) throw new Error("Restaurant ID is required");

      let query = supabase
        .from("menu_items")
        .select(`
          *,
          menu_categories (
            name
          )
        `)
        .eq("restaurant_id", restaurantId);

      if (categoryId) {
        query = query.eq("category_id", categoryId);
      }

      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }

      const { data, error } = await query.order("name");

      if (error) throw error;
      return data;
    },
    enabled: !!restaurantId,
  });
};