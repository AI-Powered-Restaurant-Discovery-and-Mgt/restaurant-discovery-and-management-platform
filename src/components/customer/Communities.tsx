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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Search, 
  Users, 
  Calendar, 
  Bell, 
  Hash, 
  TrendingUp,
  User 
} from "lucide-react";
import { UserProfileCard } from "./communities/UserProfileCard";
import { AchievementCard } from "./communities/AchievementCard";
import { CommunityPost } from "./communities/CommunityPost";

const MOCK_COMMUNITIES = [
  {
    id: '1',
    name: 'Food Enthusiasts',
    description: 'A community for passionate foodies',
    members: 1234,
    category: 'General',
    image: 'https://picsum.photos/200'
  },
  {
    id: '2',
    name: 'Vegan Recipes',
    description: 'Share and discover vegan recipes',
    members: 856,
    category: 'Recipes',
    image: 'https://picsum.photos/201'
  },
  {
    id: '3',
    name: 'Restaurant Reviews',
    description: 'Honest reviews from food lovers',
    members: 2341,
    category: 'Reviews',
    image: 'https://picsum.photos/202'
  }
];

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Virtual Cooking Class',
    date: '2024-03-25',
    time: '18:00',
    attendees: 45
  },
  {
    id: '2',
    title: 'Food Photography Workshop',
    date: '2024-03-27',
    time: '14:00',
    attendees: 30
  },
  {
    id: '3',
    title: 'Wine Tasting Event',
    date: '2024-03-29',
    time: '19:00',
    attendees: 25
  }
];

export const Communities = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [communities, setCommunities] = useState<any[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [achievements, setAchievements] = useState([
    {
      id: '1',
      name: 'Top Contributor',
      description: 'Posted 100+ times',
      icon: 'award' as const,
      color: 'text-yellow-500'
    },
    {
      id: '2',
      name: 'Recipe Master',
      description: 'Shared 50+ recipes',
      icon: 'trophy' as const,
      color: 'text-purple-500'
    },
    {
      id: '3',
      name: 'Community Leader',
      description: 'Started 5+ discussions',
      icon: 'badge' as const,
      color: 'text-blue-500'
    }
  ]);

  useEffect(() => {
    fetchUserProfile();
    fetchCommunities();
    fetchTrendingPosts();
    fetchAnalytics();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('community_analytics')
        .select(`
          *,
          community_channels (name)
        `)
        .order('engagement_rate', { ascending: false });

      if (error) throw error;
      setAnalytics(data || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from('community_channels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCommunities(data || MOCK_COMMUNITIES);
    } catch (error) {
      console.error('Error fetching communities:', error);
      setCommunities(MOCK_COMMUNITIES);
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

  const handleCreatePost = () => {
    navigate("/customer/communities/create-post");
  };

  const handleRSVP = (eventId: string) => {
    toast({
      description: "You've successfully RSVP'd to the event!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Communities</h1>
          <p className="text-muted-foreground">Connect with fellow food enthusiasts</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button onClick={() => navigate("/customer/communities/create")}>
            Create Community
          </Button>
        </div>
      </div>

      {/* User Profile and Stats */}
      {userProfile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UserProfileCard user={userProfile} />
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-sm text-muted-foreground">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">158</div>
                  <div className="text-sm text-muted-foreground">Comments</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Achievements */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="w-80 flex-shrink-0">
            <AchievementCard achievement={achievement} />
          </div>
        ))}
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {analytics.slice(0, 3).map((analytic) => (
          <Card key={analytic.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {analytic.community_channels?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Members</span>
                  <span className="font-medium">{analytic.total_members}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Active Members</span>
                  <span className="font-medium">{analytic.active_members}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Posts</span>
                  <span className="font-medium">{analytic.posts_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Engagement Rate</span>
                  <span className="font-medium">{analytic.engagement_rate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search communities..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={handleCreatePost}>
          Create Post
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
                <CommunityPost
                  key={post.id}
                  post={post}
                  onVote={handleVote}
                />
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
                        <AvatarImage src={community.image} />
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{community.name}</h4>
                        <p className="text-sm text-muted-foreground">{community.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{community.members} members</span>
                        </div>
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_EVENTS.map((event) => (
                  <div key={event.id} className="space-y-2">
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => handleRSVP(event.id)}
                    >
                      RSVP
                    </Button>
                  </div>
                ))}
              </div>
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
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary" className="mr-2">#FoodFestival</Badge>
                  <span className="text-xs text-muted-foreground">1.2k posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary" className="mr-2">#LocalEats</Badge>
                  <span className="text-xs text-muted-foreground">856 posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary" className="mr-2">#Recipes</Badge>
                  <span className="text-xs text-muted-foreground">654 posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary" className="mr-2">#Cooking</Badge>
                  <span className="text-xs text-muted-foreground">432 posts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};