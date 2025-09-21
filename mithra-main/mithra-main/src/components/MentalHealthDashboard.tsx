import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Calendar, 
  Award, 
  Activity,
  Heart,
  Smile,
  Zap
} from "lucide-react";

export const MentalHealthDashboard = () => {
  const stats = [
    { label: "Days Active", value: "12", icon: Calendar, change: "+3 this week" },
    { label: "Mood Score", value: "7.2/10", icon: Smile, change: "+0.8 from last week" },
    { label: "Sessions", value: "24", icon: Brain, change: "8 this week" },
    { label: "Streak", value: "5 days", icon: Award, change: "Personal best!" },
  ];

  const goals = [
    { title: "Daily Check-in", progress: 80, target: "7/7 days" },
    { title: "Mindfulness Practice", progress: 60, target: "15 min/day" },
    { title: "Mood Tracking", progress: 90, target: "Track 2x daily" },
  ];

  const insights = [
    {
      title: "Mood Pattern",
      description: "Your mood tends to improve in the afternoon. Consider morning activities to boost your mood earlier.",
      type: "trend",
      color: "text-green-600"
    },
    {
      title: "Sleep Connection",
      description: "Better sleep quality correlates with higher mood scores. Keep up your sleep routine!",
      type: "correlation",
      color: "text-blue-600"
    },
    {
      title: "Weekly Progress",
      description: "You've shown consistent improvement in emotional awareness this week.",
      type: "achievement",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={stat.label} className="p-4 bg-gradient-subtle border-primary/20 hover:shadow-soft transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-primary" />
              <Badge variant="secondary" className="text-xs">
                {stat.change}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Goals & Progress */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Weekly Goals</h3>
        </div>
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <div key={goal.title} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{goal.title}</span>
                <span className="text-sm text-muted-foreground">{goal.target}</span>
              </div>
              <Progress value={goal.progress} className="h-2" />
              <div className="text-right">
                <span className="text-sm font-medium text-primary">{goal.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="p-6 bg-gradient-subtle border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold gradient-text">AI Insights</h3>
        </div>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={insight.title} className="p-4 bg-card/60 rounded-lg border border-primary/10">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {insight.type === 'trend' && <TrendingUp className={`w-5 h-5 ${insight.color}`} />}
                  {insight.type === 'correlation' && <Activity className={`w-5 h-5 ${insight.color}`} />}
                  {insight.type === 'achievement' && <Zap className={`w-5 h-5 ${insight.color}`} />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-primary">
        <h3 className="text-lg font-semibold text-primary-foreground mb-4">
          Recommended Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button 
            variant="secondary" 
            className="justify-start bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30"
          >
            <Heart className="w-4 h-4 mr-2" />
            Log Current Mood
          </Button>
          <Button 
            variant="secondary"
            className="justify-start bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30"
          >
            <Brain className="w-4 h-4 mr-2" />
            Start Meditation
          </Button>
        </div>
      </Card>
    </div>
  );
};