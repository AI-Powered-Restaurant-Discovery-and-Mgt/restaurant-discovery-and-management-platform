import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
import { Communities } from "@/components/customer/Communities";
import { Favorites } from "@/components/customer/Favorites";
import { Messages } from "@/components/customer/Messages";
import { Notifications } from "@/components/customer/Notifications";
import { Settings } from "@/components/customer/Settings";
import { Profile } from "@/components/customer/Profile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

type UserType = 'restaurant_owner' | 'customer' | null;

const ProtectedRoute = ({ 
  children, 
  requiredUserType 
}: { 
  children: React.ReactNode;
  requiredUserType: UserType;
}) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', user.id)
            .single();
          
          setUserType(profile?.user_type || null);
        } else {
          setUserType(null);
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setUserType(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userType) {
    return <Navigate to="/auth" replace />;
  }

  if (userType !== requiredUserType) {
    return <Navigate to={userType === 'restaurant_owner' ? '/dashboard/restaurant' : '/customer'} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/*" element={<Auth />} />
          
          {/* Restaurant routes */}
          <Route path="/dashboard/*" element={
            <ProtectedRoute requiredUserType="restaurant_owner">
              <RestaurantDashboard />
            </ProtectedRoute>
          }>
            <Route path="restaurant" element={<RestaurantHome />} />
            <Route path="menu-management" element={<MenuManagement />} />
          </Route>

          {/* Customer routes */}
          <Route path="/customer/*" element={
            <ProtectedRoute requiredUserType="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }>
            <Route index element={<CustomerHome />} />
            <Route path="discover" element={<DiscoverRestaurants />} />
            <Route path="directory" element={<FoodDirectory />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="grocery" element={<GroceryHub />} />
            <Route path="communities" element={<Communities />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="messages" element={<Messages />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;