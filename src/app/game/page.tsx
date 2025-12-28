'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { StoryProvider, useStory, Paragraph, Choices } from '@/components/Ink';
import { CaseFile } from '@/components/Bureau/CaseFile';
import { Spirit } from '@/components/Character/Spirit';
import { useGameStore } from '@/stores/gameStore';

// Import the compiled Ink story JSON
import lesson01Story from '@/ink/lessons/lesson01.ink.json';

// Screen shake wrapper component
function ScreenShakeWrapper({
  children,
  shake
}: {
  children: React.ReactNode;
  shake: boolean;
}) {
  return (
    <motion.div
      animate={shake ? {
        x: [0, -6, 6, -4, 4, -2, 2, 0],
        rotate: [0, -1, 1, -0.5, 0.5, 0]
      } : {}}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

function GameContent() {
  const { paragraphs, choices, canContinue, continueStory, isLoading, error } = useStory();
  const { bindCharacter, isCharacterBound } = useGameStore();
  const [screenShake, setScreenShake] = useState(false);

  // Extract current character from Ink tags in paragraphs
  const [currentCharacter, setCurrentCharacter] = useState<{
    character: string;
    pinyin: string;
    meaning: string;
  } | null>(null);

  // Parse character info from tags in the story
  // Tags are on separate lines, so we need to look across all recent paragraphs
  useEffect(() => {
    const recentParagraphs = paragraphs.slice(-10);
    let character = '';
    let pinyin = '';
    let meaning = '';

    for (const p of recentParagraphs) {
      const charMatch = p.match(/# CHAR: (.+)/);
      const pinyinMatch = p.match(/# PINYIN: (.+)/);
      const meaningMatch = p.match(/# MEANING: (.+)/);

      if (charMatch) character = charMatch[1].trim();
      if (pinyinMatch) pinyin = pinyinMatch[1].trim();
      if (meaningMatch) meaning = meaningMatch[1].trim();
    }

    if (character) {
      setCurrentCharacter({ character, pinyin, meaning });
    } else {
      setCurrentCharacter(null);
    }
  }, [paragraphs]);

  // Trigger screen shake for dramatic moments
  const triggerShake = useCallback(() => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 600);
  }, []);

  // Handle binding animation
  const handleBind = useCallback(() => {
    triggerShake();
    if (currentCharacter) {
      bindCharacter({
        id: Date.now(),
        character: currentCharacter.character,
        pinyin: currentCharacter.pinyin,
        meaning: currentCharacter.meaning,
        lessonId: 1
      });
    }
  }, [currentCharacter, bindCharacter, triggerShake]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-ink-faded font-ui"
        >
          Loading case file...
        </motion.p>
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

  // Filter out tag-only paragraphs from display
  const displayParagraphs = paragraphs.filter(p => !p.startsWith('#'));

  return (
    <ScreenShakeWrapper shake={screenShake}>
      <div className="space-y-6">
        {/* Story paragraphs */}
        <div className="prose prose-invert max-w-none">
          <AnimatePresence mode="popLayout">
            {displayParagraphs.map((text, index) => (
              <Paragraph
                key={`p-${index}-${text.substring(0, 20)}`}
                text={text}
                index={index}
                typewriter={false}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Current character display (if any) */}
        <AnimatePresence>
          {currentCharacter && (
            <motion.div
              key={currentCharacter.character}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Spirit
                character={currentCharacter.character}
                pinyin={currentCharacter.pinyin}
                meaning={currentCharacter.meaning}
                isBound={isCharacterBound(currentCharacter.character)}
                showInfo
                onBind={handleBind}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Choices */}
        <Choices />

        {/* Continue button (when story can continue but no choices) */}
        <AnimatePresence>
          {canContinue && choices.length === 0 && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              onClick={continueStory}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="choice-button mt-6 text-center w-full"
            >
              <span className="text-ink-faded mr-2">▸</span>
              Continue
            </motion.button>
          )}
        </AnimatePresence>

        {/* End of story */}
        <AnimatePresence>
          {!canContinue && choices.length === 0 && paragraphs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center mt-12 pt-8 border-t border-ink-faded/20"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-ink-faded font-ui text-sm mb-6"
              >
                案件已結 — Case Closed
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
              >
                <Link href="/">
                  <button className="choice-button inline-block px-8">
                    Return to Bureau
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScreenShakeWrapper>
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-ink-faded font-ui text-lg">
            Initializing case file...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mb-8"
      >
        <Link
          href="/"
          className="inline-flex items-center text-ink-faded hover:text-ink transition-colors font-ui text-sm group"
        >
          <motion.span
            className="mr-1"
            whileHover={{ x: -4 }}
          >
            ←
          </motion.span>
          <span className="group-hover:text-spirit-glow transition-colors">
            Bureau Lobby
          </span>
        </Link>
      </motion.header>

      {/* Game content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <StoryProvider initialStory={lesson01Story}>
          <CaseFile
            caseNumber="001"
            title="The Mouth That Counted the Universe"
            division="Genesis Division"
          >
            <GameContent />
          </CaseFile>
        </StoryProvider>
      </motion.div>
    </main>
  );
}
