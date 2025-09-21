import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Palette, Sparkles } from "lucide-react";

export const ColorTherapyGame = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [currentAffirmation, setCurrentAffirmation] = useState<string>("");
  
  const colors = [
    { name: "Calm Blue", value: "#3b82f6", mood: "peaceful" },
    { name: "Joy Yellow", value: "#fbbf24", mood: "happy" },
    { name: "Growth Green", value: "#10b981", mood: "balanced" },
    { name: "Love Pink", value: "#ec4899", mood: "loving" },
    { name: "Passion Red", value: "#ef4444", mood: "energized" },
    { name: "Wisdom Purple", value: "#8b5cf6", mood: "wise" },
    { name: "Warm Orange", value: "#f97316", mood: "confident" },
    { name: "Pure White", value: "#ffffff", mood: "clear" },
  ];

  const affirmations = {
    peaceful: [
      "You are at peace with yourself and the world around you.",
      "Calmness flows through you like a gentle river.",
      "You find tranquility in every breath you take."
    ],
    happy: [
      "Joy radiates from within you and touches everyone you meet.",
      "You are a beacon of positivity and light.",
      "Happiness is your natural state of being."
    ],
    balanced: [
      "You are growing stronger and wiser every day.",
      "Balance comes naturally to you in all aspects of life.",
      "You are rooted in strength and reaching for your dreams."
    ],
    loving: [
      "You are worthy of love and you give love freely.",
      "Your heart is open to receiving and sharing beautiful moments.",
      "Love surrounds you and flows through you."
    ],
    energized: [
      "You have the power to create positive change in your life.",
      "Your passion fuels your purpose and drives you forward.",
      "You are strong, capable, and ready for anything."
    ],
    wise: [
      "You possess inner wisdom that guides you on your path.",
      "Your intuition is strong and you trust your inner voice.",
      "You see the beauty and lessons in every experience."
    ],
    confident: [
      "You radiate confidence and warmth wherever you go.",
      "You believe in yourself and your ability to succeed.",
      "You are comfortable being authentically you."
    ],
    clear: [
      "Your mind is clear and focused on what matters most.",
      "You see situations with clarity and wisdom.",
      "You have a fresh perspective on life's opportunities."
    ]
  };

  const handleColorSelect = (color: { name: string; value: string; mood: string }) => {
    const newColors = [...selectedColors, color.value];
    setSelectedColors(newColors);
    
    // Generate affirmation based on the color's mood
    const moodAffirmations = affirmations[color.mood as keyof typeof affirmations];
    const randomAffirmation = moodAffirmations[Math.floor(Math.random() * moodAffirmations.length)];
    setCurrentAffirmation(randomAffirmation);
  };

  const clearCanvas = () => {
    setSelectedColors([]);
    setCurrentAffirmation("");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-primary/5 border-primary/20">
        <div className="text-center mb-6">
          <Palette className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="text-xl font-semibold mb-2">Create Your Color Palette</h3>
          <p className="text-muted-foreground">
            Select colors that speak to your soul and receive personalized affirmations.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {colors.map((color) => (
            <Button
              key={color.name}
              onClick={() => handleColorSelect(color)}
              className="h-16 w-full rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>

        {selectedColors.length > 0 && (
          <Card className="p-4 mb-4 bg-card border-primary/20">
            <div className="text-center mb-3">
              <span className="text-sm font-medium text-muted-foreground">Your Color Combination</span>
            </div>
            <div className="flex justify-center gap-2 mb-4">
              {selectedColors.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-primary/20 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <Button 
              onClick={clearCanvas}
              variant="outline"
              size="sm"
              className="w-full border-primary/20"
            >
              Clear Canvas
            </Button>
          </Card>
        )}

        {currentAffirmation && (
          <Card className="p-6 bg-gradient-primary text-primary-foreground">
            <div className="text-center">
              <Heart className="w-6 h-6 mx-auto mb-3" />
              <p className="text-lg font-medium leading-relaxed">"{currentAffirmation}"</p>
              <div className="flex items-center justify-center gap-1 mt-3">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm opacity-90">Affirmation for you</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </Card>
        )}
      </Card>

      <Card className="p-4 bg-card/50 border-primary/20">
        <p className="text-center text-sm text-muted-foreground">
          🎨 <strong>Benefits:</strong> Color therapy can help regulate emotions, reduce anxiety, and promote positive thinking through visual meditation and mindful color selection.
        </p>
      </Card>
    </div>
  );
};