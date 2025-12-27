'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Story } from 'inkjs';

interface Choice {
  text: string;
  index: number;
}

interface StoryContextType {
  paragraphs: string[];
  choices: Choice[];
  canContinue: boolean;
  isLoading: boolean;
  error: string | null;
  continueStory: () => void;
  makeChoice: (index: number) => void;
  loadStory: (storyJson: object) => void;
  getVariable: (name: string) => unknown;
  setVariable: (name: string, value: unknown) => void;
  restart: () => void;
}

const StoryContext = createContext<StoryContextType | null>(null);

export function useStory() {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
}

interface StoryProviderProps {
  children: React.ReactNode;
  initialStory?: object;
}

export function StoryProvider({ children, initialStory }: StoryProviderProps) {
  const [story, setStory] = useState<Story | null>(null);
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [canContinue, setCanContinue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [storyJson, setStoryJson] = useState<object | null>(initialStory || null);

  // Initialize story when JSON is available
  const initializeStory = useCallback((json: object) => {
    try {
      const newStory = new Story(json);
      setStory(newStory);
      setError(null);
      return newStory;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load story');
      return null;
    }
  }, []);

  // Load a new story
  const loadStory = useCallback((json: object) => {
    setIsLoading(true);
    setParagraphs([]);
    setChoices([]);
    setStoryJson(json);
    const newStory = initializeStory(json);
    if (newStory) {
      setCanContinue(newStory.canContinue);
    }
    setIsLoading(false);
  }, [initializeStory]);

  // Continue the story
  const continueStory = useCallback(() => {
    if (!story) return;

    const newParagraphs: string[] = [];

    while (story.canContinue) {
      const text = story.Continue();
      if (text && text.trim()) {
        newParagraphs.push(text.trim());
      }
    }

    setParagraphs((prev) => [...prev, ...newParagraphs]);
    setCanContinue(story.canContinue);

    // Update choices
    const currentChoices = story.currentChoices.map((choice, index) => ({
      text: choice.text,
      index,
    }));
    setChoices(currentChoices);
  }, [story]);

  // Make a choice
  const makeChoice = useCallback((index: number) => {
    if (!story) return;

    story.ChooseChoiceIndex(index);
    setChoices([]);

    // Continue after choice
    continueStory();
  }, [story, continueStory]);

  // Get a variable from the story
  const getVariable = useCallback((name: string): unknown => {
    if (!story) return undefined;
    return story.variablesState[name];
  }, [story]);

  // Set a variable in the story
  const setVariable = useCallback((name: string, value: unknown) => {
    if (!story) return;
    story.variablesState[name] = value;
  }, [story]);

  // Restart the story
  const restart = useCallback(() => {
    if (storyJson) {
      setParagraphs([]);
      setChoices([]);
      loadStory(storyJson);
    }
  }, [storyJson, loadStory]);

  // Auto-continue on initial load
  useEffect(() => {
    if (story && story.canContinue && paragraphs.length === 0) {
      continueStory();
    }
  }, [story, paragraphs.length, continueStory]);

  const value: StoryContextType = {
    paragraphs,
    choices,
    canContinue,
    isLoading,
    error,
    continueStory,
    makeChoice,
    loadStory,
    getVariable,
    setVariable,
    restart,
  };

  return (
    <StoryContext.Provider value={value}>
      {children}
    </StoryContext.Provider>
  );
}
