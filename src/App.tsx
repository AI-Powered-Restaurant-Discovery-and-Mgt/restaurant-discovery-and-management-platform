import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import { RestaurantDashboard } from "@/components/layouts/RestaurantDashboard";
import { CustomerDashboard } from "@/components/layouts/CustomerDashboard";
import { MenuManagement } from "@/pages/MenuManagement";
import { RestaurantHome } from "@/components/dashboard/RestaurantHome";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
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
          <Route path="/customer/*" element={<CustomerDashboard />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;