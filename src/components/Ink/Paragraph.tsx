'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

interface ParagraphProps {
  text: string;
  index: number;
  className?: string;
  typewriter?: boolean;
  typewriterSpeed?: number;
  onComplete?: () => void;
}

// Parse special markup in Ink text for Chinese characters
function parseForCharacters(text: string): { text: string; hasCharacter: boolean } {
  // Pattern for bracketed characters: 【一】
  const bracketPattern = /【([^】]+)】/g;
  let hasCharacter = false;

  const parsed = text.replace(bracketPattern, (_, char) => {
    hasCharacter = true;
    return `<span class="spirit-inline">${char}</span>`;
  });

  // Handle _emphasis_ (converted from *emphasis*)
  const emphasisParsed = parsed.replace(/_([^_]+)_/g, '<em>$1</em>');

  return { text: emphasisParsed, hasCharacter };
}

// Typewriter component for cinematic text reveal
function TypewriterText({
  text,
  speed = 30,
  onComplete
}: {
  text: string;
  speed?: number;
  onComplete?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (indexRef.current >= text.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      // Handle HTML tags - don't split them
      let nextIndex = indexRef.current + 1;

      // If we're starting an HTML tag, find the end
      if (text[indexRef.current] === '<') {
        const closeIndex = text.indexOf('>', indexRef.current);
        if (closeIndex !== -1) {
          nextIndex = closeIndex + 1;
        }
      }

      setDisplayedText(text.slice(0, nextIndex));
      indexRef.current = nextIndex;
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, text, speed, onComplete]);

  return (
    <span
      dangerouslySetInnerHTML={{ __html: displayedText }}
      className={cn(!isComplete && 'typewriter-cursor')}
    />
  );
}

export function Paragraph({
  text,
  index,
  className,
  typewriter = true,
  typewriterSpeed = 25,
  onComplete
}: ParagraphProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const { text: parsedText, hasCharacter } = parseForCharacters(text);

  // Only first few paragraphs get typewriter effect
  const useTypewriter = typewriter && index < 3 && !hasCharacter;

  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.15,
        ease: 'easeOut'
      }}
      className={cn(
        'narrative-text mb-4',
        hasCharacter && 'has-spirit-character',
        className
      )}
    >
      {useTypewriter ? (
        <TypewriterText
          text={parsedText}
          speed={typewriterSpeed}
          onComplete={onComplete}
        />
      ) : (
        <span dangerouslySetInnerHTML={{ __html: parsedText }} />
      )}
    </motion.p>
  );
}
