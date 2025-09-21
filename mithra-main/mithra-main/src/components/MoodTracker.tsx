import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Frown, Meh, Heart, Zap, Cloud, Sun, CloudRain } from "lucide-react";

interface MoodEntry {
  id: string;
  mood: string;
  intensity: number;
  note?: string;
  timestamp: Date;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const moodOptions = [
  { name: "Joyful", icon: Sun, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  { name: "Content", icon: Smile, color: "text-green-500", bgColor: "bg-green-500/10" },
  { name: "Neutral", icon: Meh, color: "text-gray-500", bgColor: "bg-gray-500/10" },
  { name: "Anxious", icon: Cloud, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { name: "Sad", icon: CloudRain, color: "text-blue-600", bgColor: "bg-blue-600/10" },
  { name: "Frustrated", icon: Zap, color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { name: "Overwhelmed", icon: Frown, color: "text-red-500", bgColor: "bg-red-500/10" },
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [intensity, setIntensity] = useState<number>(3);
  const [note, setNote] = useState<string>("");
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  const handleSaveMood = () => {
    if (!selectedMood) return;

    const selectedMoodOption = moodOptions.find(m => m.name === selectedMood)!;
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      intensity,
      note,
      timestamp: new Date(),
      icon: selectedMoodOption.icon,
      color: selectedMoodOption.color,
    };

    setMoodHistory(prev => [newEntry, ...prev]);
    setSelectedMood("");
    setIntensity(3);
    setNote("");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-subtle border-primary/20">
        <h3 className="text-xl font-semibold mb-4 gradient-text">How are you feeling today?</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {moodOptions.map((mood) => (
            <Button
              key={mood.name}
              variant={selectedMood === mood.name ? "default" : "outline"}
              className={`p-4 h-auto flex-col gap-2 ${
                selectedMood === mood.name
                  ? "bg-gradient-primary text-primary-foreground"
                  : "border-primary/20 hover:bg-primary/5"
              }`}
              onClick={() => setSelectedMood(mood.name)}
            >
              <mood.icon className={`w-6 h-6 ${selectedMood === mood.name ? "text-primary-foreground" : mood.color}`} />
              <span className="text-sm">{mood.name}</span>
            </Button>
          ))}
        </div>

        {selectedMood && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Intensity (1-5)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <Button
                    key={level}
                    variant={intensity === level ? "default" : "outline"}
                    size="sm"
                    className={`w-10 h-10 p-0 ${
                      intensity === level
                        ? "bg-gradient-primary text-primary-foreground"
                        : "border-primary/20"
                    }`}
                    onClick={() => setIntensity(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Notes (optional)</label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's contributing to this feeling?"
                className="border-primary/20 focus:border-primary/40"
              />
            </div>

            <Button 
              onClick={handleSaveMood}
              className="w-full bg-gradient-primary hover:shadow-elegant text-primary-foreground"
            >
              <Heart className="w-4 h-4 mr-2" />
              Save Mood Entry
            </Button>
          </>
        )}
      </Card>

      {moodHistory.length > 0 && (
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20">
          <h3 className="text-lg font-semibold mb-4">Recent Mood History</h3>
          <div className="space-y-3">
            {moodHistory.slice(0, 5).map((entry) => (
              <div key={entry.id} className="flex items-center gap-3 p-3 bg-gradient-subtle rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-primary/10`}>
                  <entry.icon className={`w-5 h-5 ${entry.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {entry.mood}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Intensity: {entry.intensity}/5
                    </span>
                  </div>
                  {entry.note && (
                    <p className="text-sm text-muted-foreground">{entry.note}</p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {entry.timestamp.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};