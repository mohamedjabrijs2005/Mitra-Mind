"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { Mood, MoodEntry } from "@/hooks/use-mood-data";

const moodToScore: Record<Mood, number> = {
  'Happy': 5,
  'Calm': 4,
  'Sad': 2,
  'Anxious': 1,
  'Angry': 0,
};

const scoreToMood: Record<number, Mood | string> = {
  5: 'Happy',
  4: 'Calm',
  3: 'Neutral',
  2: 'Sad',
  1: 'Anxious',
  0: 'Angry',
};

const chartConfig: ChartConfig = {
  mood: {
    label: "Mood Score",
    color: "hsl(var(--primary))",
  },
};

interface MoodChartProps {
  data: MoodEntry[];
}

export function MoodChart({ data }: MoodChartProps) {
  const last30Days = new Date();
  last30Days.setHours(0, 0, 0, 0);
  last30Days.setDate(last30Days.getDate() - 30);

  const dailyAverages = data
    .filter(entry => new Date(entry.date) >= last30Days)
    .reduce((acc, entry) => {
        const date = new Date(entry.date).toISOString().split('T')[0];
        if (!acc[date]) {
            acc[date] = { scores: [], count: 0 };
        }
        acc[date].scores.push(moodToScore[entry.mood]);
        acc[date].count++;
        return acc;
    }, {} as Record<string, { scores: number[], count: number }>);
  
  const chartData = Object.keys(dailyAverages).map(date => {
    const dayData = dailyAverages[date];
    const averageScore = dayData.scores.reduce((sum, score) => sum + score, 0) / dayData.count;
    return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        mood: Math.round(averageScore * 10) / 10, // round to one decimal place
    };
  }).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (chartData.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Mood Trend</CardTitle>
                <CardDescription>Track your mood to see patterns over time. No data for the last 30 days yet.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground rounded-md border-2 border-dashed">
                    Log your mood to start seeing your trend.
                </div>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Mood Trend</CardTitle>
        <CardDescription>Your average mood score over the last 30 days. Higher scores generally indicate more positive moods.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tickFormatter={(value) => scoreToMood[value] || ''}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                    labelFormatter={(label, payload) => payload[0]?.payload.date}
                    formatter={(value) => [value, `Avg. Score`]}
                />
              }
            />
            <Bar dataKey="mood" fill="var(--color-mood)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
