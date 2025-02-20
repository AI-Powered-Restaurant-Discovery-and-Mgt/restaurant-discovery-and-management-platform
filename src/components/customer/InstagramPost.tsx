
import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface InstagramPostProps {
  id: string;
  username: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  onLike?: () => void;
}

export const InstagramPost = ({
  username,
  userAvatar,
  image,
  caption,
  likes,
  comments,
  timeAgo,
  onLike,
}: InstagramPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  return (
    <Card className="max-w-xl w-full mx-auto mb-6">
      <div className="p-4 flex items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={userAvatar} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{username}</span>
      </div>
      <div className="relative aspect-square">
        <img
          src={image}
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
            >
              <Heart
                className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark
              className={`h-6 w-6 ${isSaved ? "fill-current" : ""}`}
            />
          </Button>
        </div>
        <div className="font-medium mb-2">{likes.toLocaleString()} likes</div>
        <div className="space-y-2">
          <p>
            <span className="font-medium mr-2">{username}</span>
            {caption}
          </p>
          <p className="text-sm text-muted-foreground">
            View all {comments} comments
          </p>
          <p className="text-xs text-muted-foreground uppercase">{timeAgo}</p>
        </div>
      </div>
    </Card>
  );
};
