import { useState } from "react";
import { Search, Filter, Plus, Grid, List, Edit2, Trash2, BarChart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRestaurantId } from "@/hooks/useRestaurantId";
import { useMenuCategories } from "@/hooks/useMenuCategories";
import { useMenuItems } from "@/hooks/useMenuItems";
import { useToast } from "@/components/ui/use-toast";

export const MenuManagement = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const { restaurantId, isLoading: isLoadingRestaurant, error: restaurantError } = useRestaurantId();
  const { data: categories = [], isLoading: isLoadingCategories } = useMenuCategories(restaurantId);
  const { data: menuItems = [], isLoading: isLoadingItems } = useMenuItems(restaurantId, selectedCategory, searchQuery);

  if (isLoadingRestaurant || isLoadingCategories || isLoadingItems) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (restaurantError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load restaurant information. Please try again later.",
    });
    return null;
  }

  if (!restaurantId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] gap-4">
        <h2 className="text-2xl font-semibold">No Restaurant Found</h2>
        <p className="text-muted-foreground">Please create a restaurant first to manage menu items.</p>
        <Button size="lg" className="mt-4">Create Restaurant</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search menu items..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Available Items</DropdownMenuItem>
              <DropdownMenuItem>Unavailable Items</DropdownMenuItem>
              <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            Add New Item
          </Button>
          <div className="border-l mx-2" />
          <div className="bg-muted rounded-lg p-1 flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-background shadow-sm" : "hover:bg-background/60"}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-background shadow-sm" : "hover:bg-background/60"}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs 
        defaultValue="all" 
        onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="rounded-full">All Items</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="rounded-full">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <MenuItemsGrid items={menuItems} viewMode={viewMode} />
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-4">
            <MenuItemsGrid 
              items={menuItems.filter(item => item.category_id === category.id)} 
              viewMode={viewMode} 
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const MenuItemsGrid = ({ 
  items, 
  viewMode 
}: { 
  items: any[], 
  viewMode: "grid" | "list" 
}) => {
  const getRandomUnsplashImage = () => {
    const imageIds = [
      "brooke-lark-08bOYnH_r_E",
      "joseph-gonzalez-fdlZBWIP0aM",
      "chad-montano-MqT0asuoIcU",
      "eiliv-sonas-aceron-ZuIDLSz3XLg",
      "lily-banse-YHSwy6uqvk",
    ];
    const randomId = imageIds[Math.floor(Math.random() * imageIds.length)];
    return `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&w=800&q=80`;
  };

  return (
    <div className={`grid gap-6 ${
      viewMode === "grid" 
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
        : "grid-cols-1"
    }`}>
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="p-0">
            <img
              src={item.image_url || getRandomUnsplashImage()}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="text-xl mb-2">{item.name}</CardTitle>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description || "No description available"}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">${item.price}</span>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  item.is_available 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {item.is_available ? "Available" : "Unavailable"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {item.menu_categories?.name}
              </p>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0 flex justify-between gap-2">
            <Button variant="outline" size="icon" className="flex-1">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="flex-1">
              <BarChart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="flex-1">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};