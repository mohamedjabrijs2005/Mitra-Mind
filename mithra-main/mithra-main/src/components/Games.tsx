import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Heart, Brain, Wind, Star } from "lucide-react";
import { MemoryGame } from "@/components/games/MemoryGame";
import { ColorTherapyGame } from "@/components/games/ColorTherapyGame";
import { BreathingGame } from "@/components/games/BreathingGame";
import { MoodTrivia } from "@/components/games/MoodTrivia";

export const Games = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: "memory",
      title: "Memory Match",
      description: "Exercise your mind with this fun memory game. Match pairs of cards to improve focus and cognitive function.",
      icon: Brain,
      color: "text-purple-600",
      component: MemoryGame
    },
    {
      id: "color-therapy", 
      title: "Color Therapy",
      description: "Create beautiful color combinations and receive positive affirmations to boost your mood.",
      icon: Heart,
      color: "text-pink-600",
      component: ColorTherapyGame
    },
    {
      id: "breathing",
      title: "Breathing Exercise",
      description: "Practice guided breathing exercises to reduce anxiety and promote relaxation.",
      icon: Wind,
      color: "text-blue-600",
      component: BreathingGame
    },
    {
      id: "trivia",
      title: "Mood Trivia",
      description: "Test your knowledge about mental wellness and happiness with fun trivia questions.",
      icon: Star,
      color: "text-yellow-600",
      component: MoodTrivia
    }
  ];

  if (activeGame) {
    const game = games.find(g => g.id === activeGame);
    if (game) {
      const GameComponent = game.component;
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold gradient-text mb-2">{game.title}</h2>
              <p className="text-muted-foreground">{game.description}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setActiveGame(null)}
              className="border-primary/20"
            >
              ← Back to Games
            </Button>
          </div>
          <GameComponent />
        </div>
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium shadow-elegant">
          <Gamepad2 className="w-4 h-4" />
          Happy Games Collection
          <Star className="w-4 h-4" />
        </div>
        <h2 className="text-3xl font-bold gradient-text mb-4">Games for Your Wellbeing</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Play fun, mood-boosting games designed to reduce stress, improve focus, and bring joy to your day.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Card 
            key={game.id}
            className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-soft transition-all duration-300 group cursor-pointer"
            onClick={() => setActiveGame(game.id)}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-subtle rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <game.icon className={`w-8 h-8 ${game.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{game.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{game.description}</p>
              <Button 
                className="bg-gradient-primary hover:shadow-elegant text-primary-foreground w-full"
              >
                Play Game
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-primary/5 border-primary/20">
        <div className="text-center">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Mental Health Benefits</h3>
          <p className="text-muted-foreground">
            These games are designed to support your mental wellness through cognitive stimulation, 
            stress reduction, mindfulness practice, and positive reinforcement.
          </p>
        </div>
      </Card>
    </div>
  );
};