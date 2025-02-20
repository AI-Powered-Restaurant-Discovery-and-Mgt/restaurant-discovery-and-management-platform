import { ShoppingCart, Bell, Search, MessageSquare, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
export const CustomerTopNav = () => {
  const navigate = useNavigate();
  const [showMessages, setShowMessages] = useState(false);
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
  return <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      

      <Dialog open={showMessages} onOpenChange={setShowMessages}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Messages</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">No messages yet</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};