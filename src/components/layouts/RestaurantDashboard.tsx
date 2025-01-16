import { MinimalHeader } from "@/components/MinimalHeader";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInput,
} from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import { 
  LayoutDashboard, 
  Menu, 
  ShoppingCart, 
  Calendar, 
  BarChart, 
  Megaphone, 
  Settings, 
  LogOut, 
  Bell,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const RestaurantDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <>
      <MinimalHeader />
      <div className="min-h-screen flex w-full">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="mt-16">
              <div className="px-2 mt-4">
                <SidebarInput type="search" placeholder="Search navigation..." />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Dashboard">
                    <LayoutDashboard />
                    <span>Overview</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Menu Management">
                    <Menu />
                    <span>Menu Management</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Orders">
                    <ShoppingCart />
                    <span>Orders</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Reservations">
                    <Calendar />
                    <span>Reservations</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Analytics">
                    <BarChart />
                    <span>Analytics</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Marketing">
                    <Megaphone />
                    <span>Marketing</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings">
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout}>
                    <LogOut />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1">
            <div className="fixed top-16 right-0 left-0 z-20 bg-background border-b">
              <div className="flex h-16 items-center px-4 gap-4">
                <div className="flex-1">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="search"
                      placeholder="Search orders, reservations..."
                      className="w-full pl-8 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                        3
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="grid gap-2 p-2">
                      <div className="grid gap-1">
                        <div className="text-sm font-medium">New Order (#123)</div>
                        <div className="text-xs text-muted-foreground">2 minutes ago</div>
                      </div>
                      <div className="grid gap-1">
                        <div className="text-sm font-medium">New Reservation</div>
                        <div className="text-xs text-muted-foreground">15 minutes ago</div>
                      </div>
                      <div className="grid gap-1">
                        <div className="text-sm font-medium">New Review (4★)</div>
                        <div className="text-xs text-muted-foreground">1 hour ago</div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <img
                        src="/placeholder.svg"
                        alt="Profile"
                        className="rounded-full"
                        width={24}
                        height={24}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="p-4 mt-32">
              {/* Dashboard content will be rendered here based on selected section */}
            </div>
          </main>
        </SidebarProvider>
      </div>
    </>
  );
};