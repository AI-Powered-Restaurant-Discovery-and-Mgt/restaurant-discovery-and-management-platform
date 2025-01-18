import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CustomerHome = () => {
  const feedItems = [
    {
      id: 1,
      type: "restaurant",
      title: "New Italian Restaurant Opening!",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      description: "Experience authentic Italian cuisine in your neighborhood.",
    },
    {
      id: 2,
      type: "recipe",
      title: "Homemade Pizza Recipe",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      description: "Learn how to make the perfect pizza at home.",
    },
    {
      id: 3,
      type: "event",
      title: "Cooking Workshop",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
      description: "Join our weekend cooking workshop with Chef John.",
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

  return (
    <div className="space-y-8">
      <Tabs defaultValue="for-you" className="space-y-4">
        <TabsList>
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="trending">Trending Now</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <TabsContent value="for-you" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {feedItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
                <CardHeader>
                  <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

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
    </div>
  );
};