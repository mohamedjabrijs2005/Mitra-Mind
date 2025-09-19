"use client";

import { useState } from "react";
import { Angry, Annoyed, Frown, Meh, Smile } from "lucide-react";
import { useMoodData, type Mood } from "@/hooks/use-mood-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MoodChart } from "./mood-chart";
import { Skeleton } from "@/components/ui/skeleton";

const moodOptions: { mood: Mood; icon: React.ElementType, label: string }[] = [
  { mood: 'Happy', icon: Smile, label: 'Happy' },
  { mood: 'Calm', icon: Meh, label: 'Calm' },
  { mood: 'Sad', icon: Frown, label: 'Sad' },
  { mood: 'Anxious', icon: Annoyed, label: 'Anxious' },
  { mood: 'Angry', icon: Angry, label: 'Angry' },
];

export function MoodTrackerClient() {
  const { moodData, addMood, isLoaded } = useMoodData();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const handleMoodSelect = (mood: Mood) => {
    addMood(mood);
    setSelectedMood(mood);
    setTimeout(() => setSelectedMood(null), 2000);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>Select a mood to log it. Your data is stored privately on your device.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center gap-4">
            {moodOptions.map(({ mood, icon: Icon, label }) => (
              <Button
                key={mood}
                variant={selectedMood === mood ? "default" : "outline"}
                size="lg"
                className="flex flex-col h-24 w-24 items-center justify-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleMoodSelect(mood)}
                aria-pressed={selectedMood === mood}
              >
                <Icon className="h-8 w-8" />
                <span>{label}</span>
              </Button>
            ))}
          </div>
          {selectedMood && (
            <p className="mt-4 text-center text-primary font-medium animate-pulse">
              Logged: {selectedMood}!
            </p>
          )}
        </CardContent>
      </Card>
      
      {isLoaded ? (
        <MoodChart data={moodData} />
      ) : (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-2/3 mt-2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-[300px] w-full" />
            </CardContent>
        </Card>
      )}
    </div>
  );
}
