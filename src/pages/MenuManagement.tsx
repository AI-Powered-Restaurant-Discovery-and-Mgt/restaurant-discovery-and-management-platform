import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MenuHeader } from "@/components/menu-management/MenuHeader";
import { MenuItem } from "@/components/menu-management/MenuItem";
import { MenuAnalytics } from "@/components/menu-management/MenuAnalytics";
import { AIRecommendations } from "@/components/dashboard/AIRecommendations";

// Mock data
const categories = [
  { id: "all", name: "All Items" },
  { id: "appetizers", name: "Appetizers" },
  { id: "main", name: "Main Course" },
  { id: "desserts", name: "Desserts" },
  { id: "beverages", name: "Beverages" },
];

const mockItems = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, basil, and olive oil on our signature crust",
    price: 14.99,
    category: "Main Course",
    image_url: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    is_available: true,
    rating: 4.8,
    orders: 324,
  },
  {
    id: "2",
    name: "Classic Caesar Salad",
    description: "Crisp romaine lettuce, parmesan cheese, croutons, and our house-made Caesar dressing",
    price: 9.99,
    category: "Appetizers",
    image_url: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80",
    is_available: true,
    rating: 4.5,
    orders: 198,
  },
  {
    id: "3",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
    price: 8.99,
    category: "Desserts",
    image_url: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80",
    is_available: true,
    rating: 4.9,
    orders: 156,
  },
];

export const MenuManagement = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems = mockItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "all" || item.category.toLowerCase() === selectedCategory)
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <MenuHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <Tabs 
            defaultValue="all" 
            onValueChange={setSelectedCategory}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <TabsList className="mb-4">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="rounded-full">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-4">
                <div className={`grid gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                    : "grid-cols-1"
                }`}>
                  {filteredItems.map((item) => (
                    <MenuItem key={item.id} item={item} viewMode={viewMode} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <MenuAnalytics />
        </div>

        <div className="space-y-8">
          <AIRecommendations />
        </div>
      </div>
    </div>
  );
};