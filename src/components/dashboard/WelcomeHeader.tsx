import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

const tips = [
  "Offer a limited-time discount during lunch hours to boost sales!",
  "Consider adding seasonal items to your menu",
  "Engage with customer reviews to build loyalty",
  "Analyze your peak hours to optimize staffing",
];

export const WelcomeHeader = ({ restaurantName }: { restaurantName: string }) => {
  const [greeting, setGreeting] = useState("Good Morning");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tip, setTip] = useState(tips[0]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
    } else if (hour >= 17) {
      setGreeting("Good Evening");
    }

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const tipIndex = Math.floor(Math.random() * tips.length);
    setTip(tips[tipIndex]);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {greeting}, {restaurantName}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your restaurant today.
          </p>
        </div>
        <div className="flex gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{format(currentTime, "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{format(currentTime, "h:mm a")}</span>
          </div>
        </div>
      </div>
      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm font-medium">💡 Tip of the day:</p>
        <p className="text-sm text-muted-foreground">{tip}</p>
      </div>
    </div>
  );
};