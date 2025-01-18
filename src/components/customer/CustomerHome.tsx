import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstagramPost } from "./InstagramPost";

export const CustomerHome = () => {
  const feedItems = [
    {
      id: "1",
      username: "italianfoodlover",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      caption: "Experience authentic Italian cuisine in your neighborhood. Join us for our grand opening!",
      likes: 245,
      comments: 18,
      timeAgo: "2 hours ago",
    },
    {
      id: "2",
      username: "homechef",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      caption: "Learn how to make the perfect pizza at home with our step-by-step guide!",
      likes: 532,
      comments: 42,
      timeAgo: "5 hours ago",
    },
    {
      id: "3",
      username: "foodworkshop",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
      caption: "Join our weekend cooking workshop with Chef John. Limited spots available!",
      likes: 876,
      comments: 91,
      timeAgo: "1 day ago",
    },
  ];

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

  const trendingPosts = [
    {
      id: "4",
      username: "foodtrends",
      userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      caption: "The hottest food trend of 2024: Fusion Tacos! 🌮✨",
      likes: 1532,
      comments: 203,
      timeAgo: "3 hours ago",
    },
  ];

  const followingPosts = [
    {
      id: "5",
      username: "healthyeats",
      userAvatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
      caption: "Start your day right with this nutritious breakfast bowl! 🥗",
      likes: 428,
      comments: 32,
      timeAgo: "1 hour ago",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
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

      <Tabs defaultValue="for-you" className="space-y-4">
        <TabsList>
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="trending">Trending Now</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        
        <TabsContent value="for-you" className="space-y-4">
          {feedItems.map((post) => (
            <InstagramPost key={post.id} {...post} />
          ))}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          {trendingPosts.map((post) => (
            <InstagramPost key={post.id} {...post} />
          ))}
        </TabsContent>

        <TabsContent value="following" className="space-y-4">
          {followingPosts.map((post) => (
            <InstagramPost key={post.id} {...post} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};