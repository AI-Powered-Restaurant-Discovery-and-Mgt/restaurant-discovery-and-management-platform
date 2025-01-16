import { Plus, ShoppingBag, Megaphone, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Button variant="outline" className="flex flex-col h-24 gap-2">
        <Plus className="h-5 w-5" />
        <span>Add Menu Item</span>
      </Button>
      <Button variant="outline" className="flex flex-col h-24 gap-2">
        <ShoppingBag className="h-5 w-5" />
        <span>View Orders</span>
      </Button>
      <Button variant="outline" className="flex flex-col h-24 gap-2">
        <Megaphone className="h-5 w-5" />
        <span>New Promotion</span>
      </Button>
      <Button variant="outline" className="flex flex-col h-24 gap-2">
        <Package className="h-5 w-5" />
        <span>Check Inventory</span>
      </Button>
    </div>
  );
};