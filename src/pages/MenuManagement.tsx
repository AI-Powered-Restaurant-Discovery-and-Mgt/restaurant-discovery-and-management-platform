import { useState } from "react";
import { Search, Filter, Plus, Grid, List, Edit2, Trash2, BarChart } from "lucide-react";
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

export const MenuManagement = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    "All Items",
    "Appetizers",
    "Main Course",
    "Desserts",
    "Beverages",
  ];

  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      category: "Main Course",
      price: 14.99,
      image: "/placeholder.svg",
      available: true,
      rating: 4.5,
    },
    // ... more items would be loaded from the database
  ];

  return (
    <div className="space-y-8 p-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search menu items..." className="pl-8" />
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
      <Tabs defaultValue="All Items">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className={`grid gap-4 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1"
            }`}>
              {menuItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{item.name}</CardTitle>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {item.category}
                      </p>
                      <p className="font-medium">${item.price}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm">{item.rating}</span>
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};