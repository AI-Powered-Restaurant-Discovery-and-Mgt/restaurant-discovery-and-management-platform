import { BarChart, LineChart, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const MenuAnalytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Selling Items</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Margherita Pizza</span>
              <span className="text-sm font-medium">324 orders</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Classic Burger</span>
              <span className="text-sm font-medium">256 orders</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Caesar Salad</span>
              <span className="text-sm font-medium">198 orders</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Preparation Time</CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Fast Food</span>
              <span className="text-sm font-medium">12 mins</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Main Course</span>
              <span className="text-sm font-medium">25 mins</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Desserts</span>
              <span className="text-sm font-medium">15 mins</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Category Distribution</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Main Course</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Appetizers</span>
              <span className="text-sm font-medium">30%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Desserts</span>
              <span className="text-sm font-medium">25%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};