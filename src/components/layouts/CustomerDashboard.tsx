import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MinimalHeader } from "@/components/MinimalHeader";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import {
  Home,
  Search,
  Utensils,
  BookOpen,
  ShoppingBag,
  Package,
  Users,
  Heart,
  MessageSquare,
  Bell,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { CustomerTopNav } from "@/components/customer/CustomerTopNav";

export const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const menuItems = [
    { icon: Home, label: "Home", path: "/customer" },
    { icon: Utensils, label: "Discover Restaurants", path: "/customer/discover" },
    { icon: BookOpen, label: "Food Directory", path: "/customer/directory" },
    { icon: ShoppingBag, label: "Food Marketplace", path: "/customer/marketplace" },
    { icon: Package, label: "Grocery Hub", path: "/customer/grocery" },
    { icon: Users, label: "Communities", path: "/customer/communities" },
    { icon: Heart, label: "Favorites", path: "/customer/favorites" },
    { icon: MessageSquare, label: "Messages", path: "/customer/messages" },
    { icon: Bell, label: "Notifications", path: "/customer/notifications" },
    { icon: Settings, label: "Settings", path: "/customer/settings" },
    { icon: User, label: "Profile", path: "/customer/profile" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton onClick={() => navigate(item.path)}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 pt-16">
          <MinimalHeader />
          <CustomerTopNav />
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};