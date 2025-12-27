'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { StoryProvider, useStory, Paragraph, Choices } from '@/components/Ink';
import { CaseFile } from '@/components/Bureau/CaseFile';
import { Spirit } from '@/components/Character/Spirit';
import { useGameStore } from '@/stores/gameStore';

// Import the compiled Ink story JSON
// For now, we'll use a placeholder until we compile the real story
import lesson01Story from '@/ink/lessons/lesson01.ink.json';

function GameContent() {
  const { paragraphs, choices, canContinue, continueStory, isLoading, error } = useStory();
  const { bindCharacter, isCharacterBound } = useGameStore();

  // Track current character being displayed (extracted from Ink variables or tags)
  const [currentCharacter, setCurrentCharacter] = useState<{
    character: string;
    pinyin: string;
    meaning: string;
  } | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-ink-faded font-ui">Loading case file...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-seal-red font-ui">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Story paragraphs */}
      <div className="prose prose-invert max-w-none">
        {paragraphs.map((text, index) => (
          <Paragraph key={index} text={text} index={index} />
        ))}
      </div>

      {/* Current character display (if any) */}
      {currentCharacter && (
        <Spirit
          character={currentCharacter.character}
          pinyin={currentCharacter.pinyin}
          meaning={currentCharacter.meaning}
          isBound={isCharacterBound(currentCharacter.character)}
          showInfo
        />
      )}

      {/* Choices */}
      <Choices />

      {/* Continue button (when story can continue but no choices) */}
      {canContinue && choices.length === 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={continueStory}
          className="choice-button mt-6 text-center"
        >
          <span className="text-ink-faded">▸</span> Continue
        </motion.button>
      )}

      {/* End of story */}
      {!canContinue && choices.length === 0 && paragraphs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 pt-8 border-t border-ink-faded/20"
        >
          <p className="text-ink-faded font-ui text-sm mb-4">
            案件已結 — Case Closed
          </p>
          <Link href="/">
            <button className="choice-button inline-block">
              Return to Bureau
            </button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default function GamePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-ink-faded font-ui">Initializing...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="max-w-3xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-ink-faded hover:text-ink transition-colors font-ui text-sm"
        >
          ← Bureau Lobby
        </Link>
      </header>

      {/* Game content */}
      <StoryProvider initialStory={lesson01Story}>
        <CaseFile
          caseNumber="001"
          title="The Mouth That Counted the Universe"
          division="Genesis Division"
        >
          <GameContent />
        </CaseFile>
      </StoryProvider>
    </main>
  );
}
