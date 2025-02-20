
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstagramPost } from "./InstagramPost";
import { CreatePostDialog } from "./CreatePostDialog";
import { usePosts } from "@/hooks/usePosts";
import { Loader2 } from "lucide-react";

export const CustomerHome = () => {
  const forYouPosts = usePosts('for-you');
  const trendingPosts = usePosts('trending');
  const followingPosts = usePosts('following');

  const recommendations = [
    {
      id: 1,
      title: "Based on your recent orders",
      items: ["Thai Express", "Sushi Bar", "Mediterranean Grill"],
    },
    {
      id: 2,
      title: "Popular in your area",
      items: ["Burger House", "Pizza Palace", "Taco Stand"],
    },
  ];

  const renderPosts = (
    posts: typeof forYouPosts.posts,
    isLoading: boolean,
    error: unknown
  ) => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8 text-muted-foreground">
          Error loading posts. Please try again later.
        </div>
      );
    }

    if (!posts?.length) {
      return (
        <div className="text-center p-8 text-muted-foreground">
          No posts found. Follow some users to see their posts here!
        </div>
      );
    }

    return posts.map((post) => (
      <InstagramPost
        key={post.id}
        id={post.id}
        username={post.profiles?.full_name || 'Anonymous'}
        userAvatar={post.profiles?.avatar_url || ''}
        image={post.image_url || ''}
        caption={post.content}
        likes={post.likes_count || 0}
        comments={post.comments_count || 0}
        timeAgo={new Date(post.created_at).toLocaleDateString()}
        onLike={() => forYouPosts.toggleLike(post.id)}
      />
    ));
  };

  return (
    <div className="flex gap-4">
      {/* Left column - Posts */}
      <div className="flex-1 max-w-2xl ml-4">
        <CreatePostDialog />
        <Tabs defaultValue="for-you" className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="trending">Trending Now</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          
          <TabsContent value="for-you" className="space-y-4">
            {renderPosts(forYouPosts.posts, forYouPosts.isLoading, forYouPosts.error)}
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            {renderPosts(trendingPosts.posts, trendingPosts.isLoading, trendingPosts.error)}
          </TabsContent>

          <TabsContent value="following" className="space-y-4">
            {renderPosts(followingPosts.posts, followingPosts.isLoading, followingPosts.error)}
          </TabsContent>
        </Tabs>
      </div>

      {/* Right column - Recommendations and other content */}
      <div className="w-80 space-y-4 mr-4">
        {recommendations.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center space-x-2 text-sm text-muted-foreground"
                  >
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
