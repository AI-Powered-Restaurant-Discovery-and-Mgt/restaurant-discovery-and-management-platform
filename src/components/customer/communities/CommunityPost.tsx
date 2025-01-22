import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, MessageSquare, BookmarkPlus, Share2, User } from "lucide-react";

interface CommunityPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    profiles?: {
      full_name?: string;
      avatar_url?: string;
    };
    community_channels?: {
      name: string;
    };
  };
  onVote: (postId: string, type: 'up' | 'down') => void;
}

export const CommunityPost = ({ post, onVote }: CommunityPostProps) => {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={post.profiles?.avatar_url} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{post.profiles?.full_name || 'Anonymous'}</span>
              <span className="text-muted-foreground">in</span>
              <Badge variant="outline">{post.community_channels?.name}</Badge>
            </div>
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-muted-foreground">{post.content}</p>
            <div className="flex items-center gap-4 pt-2">
              <Button variant="ghost" size="sm" onClick={() => onVote(post.id, 'up')}>
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>123</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onVote(post.id, 'down')}>
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>12</span>
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>45 Comments</span>
              </Button>
              <Button variant="ghost" size="sm">
                <BookmarkPlus className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};