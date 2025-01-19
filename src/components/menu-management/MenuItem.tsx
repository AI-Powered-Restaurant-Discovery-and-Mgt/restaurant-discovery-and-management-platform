import { Edit2, Trash2, BarChart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface MenuItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image_url: string;
    is_available: boolean;
    rating: number;
    orders: number;
  };
  viewMode: "grid" | "list";
}

export const MenuItem = ({ item, viewMode }: MenuItemProps) => {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (viewMode === "list") {
      return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
          {children}
        </div>
      );
    }
    return <Card>{children}</Card>;
  };

  return (
    <CardWrapper>
      {viewMode === "grid" ? (
        <>
          <CardHeader className="p-0">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="text-xl mb-2 flex items-center justify-between">
              {item.name}
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm">{item.rating}</span>
              </div>
            </CardTitle>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">${item.price}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Available</span>
                  <Switch checked={item.is_available} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {item.category} • {item.orders} orders
              </p>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0 flex justify-between gap-2">
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
        </>
      ) : (
        <>
          <img
            src={item.image_url}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">{item.rating}</span>
                </div>
                <span className="text-lg font-semibold">${item.price}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
              {item.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {item.category} • {item.orders} orders
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Available</span>
                <Switch checked={item.is_available} />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <BarChart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </CardWrapper>
  );
};