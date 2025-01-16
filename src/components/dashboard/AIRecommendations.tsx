import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recommendations = [
  {
    title: "Boost Morning Sales",
    description: "Add a discount for breakfast items tomorrow morning to increase early traffic.",
  },
  {
    title: "Menu Suggestion",
    description: "Customers are searching for vegan options. Consider adding plant-based alternatives.",
  },
  {
    title: "Peak Hours",
    description: "Your busiest hours are between 12-2 PM. Consider additional staff during this period.",
  },
];

export const AIRecommendations = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-1">{rec.title}</h4>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};