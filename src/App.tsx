import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import { RestaurantDashboard } from "@/components/layouts/RestaurantDashboard";
import { CustomerDashboard } from "@/components/layouts/CustomerDashboard";
import { MenuManagement } from "@/pages/MenuManagement";
import { RestaurantHome } from "@/components/dashboard/RestaurantHome";
import { CustomerHome } from "@/components/customer/CustomerHome";
import { DiscoverRestaurants } from "@/components/customer/DiscoverRestaurants";
import { FoodDirectory } from "@/components/customer/FoodDirectory";
import { Marketplace } from "@/components/customer/Marketplace";
import { GroceryHub } from "@/components/customer/GroceryHub";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/dashboard/*" element={<RestaurantDashboard />}>
            <Route path="restaurant" element={<RestaurantHome />} />
            <Route path="menu-management" element={<MenuManagement />} />
          </Route>
          <Route path="/customer/*" element={<CustomerDashboard />}>
            <Route index element={<CustomerHome />} />
            <Route path="discover" element={<DiscoverRestaurants />} />
            <Route path="directory" element={<FoodDirectory />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="grocery" element={<GroceryHub />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;