
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type Post = {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
  };
  likes_count?: number;
  comments_count?: number;
  has_liked?: boolean;
};

export const usePosts = (type: 'for-you' | 'trending' | 'following' = 'for-you') => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch posts with joins
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts', type],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          ),
          likes (count),
          comments (count)
        `)
        .order('created_at', { ascending: false });

      if (type === 'trending') {
        query = query.order('likes.count', { ascending: false });
      } else if (type === 'following') {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: following } = await supabase
            .from('user_follows')
            .select('following_id')
            .eq('follower_id', user.id);
          
          if (following?.length) {
            query = query.in('user_id', following.map(f => f.following_id));
          }
        }
      }

      const { data, error } = await query.limit(20);
      
      if (error) throw error;
      return data as Post[];
    },
  });

  // Like/Unlike mutation
  const { mutate: toggleLike } = useMutation({
    mutationFn: async (postId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: existingLike } = await supabase
        .from('likes')
        .select()
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

      if (existingLike) {
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('likes')
          .insert({ post_id: postId, user_id: user.id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('posts-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    posts,
    isLoading,
    error,
    toggleLike,
  };
};
