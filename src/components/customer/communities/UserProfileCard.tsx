import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, User } from "lucide-react";

interface UserProfileCardProps {
  user: {
    full_name?: string;
    avatar_url?: string;
    profile_completion_percentage?: number;
  };
}

export const UserProfileCard = ({ user }: UserProfileCardProps) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>
              <User className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{user.full_name || 'Anonymous User'}</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Profile Completion</span>
                <span className="font-medium">{user.profile_completion_percentage || 0}%</span>
              </div>
              <Progress value={user.profile_completion_percentage || 0} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};