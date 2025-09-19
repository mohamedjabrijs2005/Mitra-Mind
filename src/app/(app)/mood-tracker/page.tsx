import { MoodTrackerClient } from "@/components/mood/mood-tracker-client";

export default function MoodTrackerPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Mood Tracker</h1>
        <p className="text-muted-foreground mt-2">
          Reflect on your feelings and observe your emotional patterns over time.
        </p>
      </header>
      <MoodTrackerClient />
    </div>
  );
}
