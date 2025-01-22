import { Card, CardContent } from "@/components/ui/card";
import { Award, Trophy, BadgeCheck } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: 'award' | 'trophy' | 'badge';
  color?: string;
}

interface AchievementCardProps {
  achievement: Achievement;
}

const getIcon = (type: Achievement['icon'], color?: string) => {
  const props = { className: `h-5 w-5 ${color || 'text-primary'}` };
  switch (type) {
    case 'award':
      return <Award {...props} />;
    case 'trophy':
      return <Trophy {...props} />;
    case 'badge':
      return <BadgeCheck {...props} />;
    default:
      return <Award {...props} />;
  }
};

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {getIcon(achievement.icon, achievement.color)}
          <div>
            <h4 className="font-semibold">{achievement.name}</h4>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};