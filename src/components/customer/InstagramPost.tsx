
import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  id,
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
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postComments, setPostComments] = useState<Array<{
    id: string;
    content: string;
    profiles?: { full_name?: string; avatar_url?: string };
    created_at: string;
  }>>([]);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('post_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPostComments(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      });
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('comments')
        .insert({
          content: newComment,
          post_id: id,
          user_id: user.id
        });

      if (error) throw error;

      setNewComment("");
      loadComments();
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                setShowComments(!showComments);
                if (!showComments) loadComments();
              }}
            >
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
          <button
            onClick={() => {
              setShowComments(!showComments);
              if (!showComments) loadComments();
            }}
            className="text-sm text-muted-foreground hover:underline"
          >
            View all {comments} comments
          </button>
          <p className="text-xs text-muted-foreground uppercase">{timeAgo}</p>
        </div>

        {showComments && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddComment();
                }}
                disabled={isLoading}
              />
              <Button
                size="icon"
                disabled={isLoading}
                onClick={handleAddComment}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="space-y-3">
              {postComments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={comment.profiles?.avatar_url} />
                    <AvatarFallback>
                      {comment.profiles?.full_name?.[0] || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-medium mr-2">
                      {comment.profiles?.full_name || 'Anonymous'}
                    </span>
                    <span className="text-sm">{comment.content}</span>
                    <p className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
