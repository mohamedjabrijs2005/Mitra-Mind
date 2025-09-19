"use client";

import { useState, useEffect, useCallback } from 'react';

export type Mood = 'Happy' | 'Calm' | 'Sad' | 'Anxious' | 'Angry';

export interface MoodEntry {
  mood: Mood;
  date: string; // ISO string
}

const STORAGE_KEY = 'mitraMindMoodData';

export function useMoodData() {
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedData = window.localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
            setMoodData(parsedData);
        }
      }
    } catch (error) {
      console.error("Failed to load mood data from localStorage", error);
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const addMood = useCallback((mood: Mood) => {
    const newEntry: MoodEntry = { mood, date: new Date().toISOString() };
    setMoodData(prevData => {
        const newData = [...prevData, newEntry];
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        } catch (error) {
            console.error("Failed to save mood data to localStorage", error);
        }
        return newData;
    });
  }, []);

  return { moodData, addMood, isLoaded };
}
