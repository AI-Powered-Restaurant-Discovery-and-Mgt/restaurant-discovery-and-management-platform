import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Search, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Calendar,
  ArrowUp,
  ArrowDown,
  BookmarkPlus,
  Share2
} from "lucide-react";

export const Communities = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [communities, setCommunities] = useState<any[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunities();
    fetchTrendingPosts();
  }, []);

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from('community_channels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCommunities(data || []);
    } catch (error) {
      console.error('Error fetching communities:', error);
      toast({
        title: "Error",
        description: "Failed to load communities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          community_channels (name),
          profiles (full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setTrendingPosts(data || []);
    } catch (error) {
      console.error('Error fetching trending posts:', error);
    }
  };

  const handleJoinCommunity = async (communityId: string) => {
    toast({
      title: "Success",
      description: "You've joined the community!",
    });
  };

  const handleVote = async (postId: string, type: 'up' | 'down') => {
    toast({
      description: `Vote ${type} registered`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Create Section */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search communities..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => navigate("/customer/communities/create")}>
          Create Community
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="trending" className="w-full">
            <TabsList>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="space-y-4">
              {trendingPosts.map((post) => (
                <Card key={post.id} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>{post.profiles?.full_name?.[0] || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{post.profiles?.full_name}</span>
                          <span className="text-muted-foreground">in</span>
                          <Badge variant="outline">{post.community_channels?.name}</Badge>
                        </div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-muted-foreground">{post.content}</p>
                        <div className="flex items-center gap-4 pt-2">
                          <Button variant="ghost" size="sm" onClick={() => handleVote(post.id, 'up')}>
                            <ArrowUp className="h-4 w-4 mr-1" />
                            <span>123</span>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleVote(post.id, 'down')}>
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
              ))}
            </TabsContent>

            <TabsContent value="latest">
              <Card>
                <CardContent>
                  <p className="text-muted-foreground">Latest posts will appear here...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="following">
              <Card>
                <CardContent>
                  <p className="text-muted-foreground">Posts from communities you follow will appear here...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Communities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Featured Communities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {communities.map((community) => (
                    <div key={community.id} className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>{community.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{community.name}</h4>
                        <p className="text-sm text-muted-foreground">{community.description}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => handleJoinCommunity(community.id)}
                        >
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No upcoming events</p>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="mr-2">#FoodFestival</Badge>
                <Badge variant="secondary" className="mr-2">#LocalEats</Badge>
                <Badge variant="secondary" className="mr-2">#Recipes</Badge>
                <Badge variant="secondary" className="mr-2">#Cooking</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};