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
      <div className="flex items-center justify-center h-screen">
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
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h2 className="text-xl font-semibold">No Restaurant Found</h2>
        <p className="text-muted-foreground">Please create a restaurant first to manage menu items.</p>
        <Button>Create Restaurant</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search menu items..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Available</DropdownMenuItem>
              <DropdownMenuItem>Unavailable</DropdownMenuItem>
              <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Item
          </Button>
          <div className="border-l" />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-accent" : ""}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-accent" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs 
        defaultValue="all" 
        onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}
      >
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <MenuItemsGrid items={menuItems} viewMode={viewMode} />
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
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
  return (
    <div className={`grid gap-4 ${
      viewMode === "grid" 
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
        : "grid-cols-1"
    }`}>
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <img
              src={item.image_url || "/placeholder.svg"}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md"
            />
          </CardHeader>
          <CardContent>
            <CardTitle>{item.name}</CardTitle>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-muted-foreground">
                {item.menu_categories?.name}
              </p>
              <p className="font-medium">${item.price}</p>
              <div className="flex items-center gap-2">
                {item.is_available ? (
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-0.5 rounded">
                    Available
                  </span>
                ) : (
                  <span className="text-sm text-red-600 bg-red-100 px-2 py-0.5 rounded">
                    Unavailable
                  </span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="icon">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <BarChart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};