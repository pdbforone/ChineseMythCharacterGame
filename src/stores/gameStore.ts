import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BoundCharacter {
  id: number;
  character: string;
  pinyin: string;
  meaning: string;
  boundAt: string; // ISO date string
  lessonId: number;
}

export interface GameState {
  // Progress
  currentLesson: number;
  boundCharacters: BoundCharacter[];
  completedLessons: number[];

  // Session
  isPlaying: boolean;

  // Actions
  bindCharacter: (char: Omit<BoundCharacter, 'boundAt'>) => void;
  isCharacterBound: (character: string) => boolean;
  completeLesson: (lessonId: number) => void;
  setCurrentLesson: (lessonId: number) => void;
  setIsPlaying: (playing: boolean) => void;
  resetProgress: () => void;

  // Stats
  getBoundCount: () => number;
  getCompletedCount: () => number;
}

const initialState = {
  currentLesson: 1,
  boundCharacters: [],
  completedLessons: [],
  isPlaying: false,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,

      bindCharacter: (char) => {
        const existing = get().boundCharacters.find((c) => c.character === char.character);
        if (existing) return; // Already bound

        set((state) => ({
          boundCharacters: [
            ...state.boundCharacters,
            { ...char, boundAt: new Date().toISOString() },
          ],
        }));
      },

      isCharacterBound: (character) => {
        return get().boundCharacters.some((c) => c.character === character);
      },

      completeLesson: (lessonId) => {
        if (get().completedLessons.includes(lessonId)) return;

        set((state) => ({
          completedLessons: [...state.completedLessons, lessonId],
        }));
      },

      setCurrentLesson: (lessonId) => {
        set({ currentLesson: lessonId });
      },

      setIsPlaying: (playing) => {
        set({ isPlaying: playing });
      },

      resetProgress: () => {
        set(initialState);
      },

      getBoundCount: () => get().boundCharacters.length,
      getCompletedCount: () => get().completedLessons.length,
    }),
    {
      name: 'ministry-game-storage',
    }
  )
);
