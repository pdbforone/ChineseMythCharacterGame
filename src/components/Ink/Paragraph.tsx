'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface ParagraphProps {
  text: string;
  index: number;
  className?: string;
}

// Parse special markup in Ink text
// Supports: *emphasis*, **strong**, {character:X} for character display
function parseInkText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  // Pattern for character display: {char:一}
  const charPattern = /\{char:(.+?)\}/g;
  // Pattern for emphasis: *text*
  const emPattern = /\*([^*]+)\*/g;
  // Pattern for strong: **text**
  const strongPattern = /\*\*([^*]+)\*\*/g;

  // Simple parser - handle character markers first
  remaining = remaining.replace(charPattern, (_, char) => {
    return `<span class="font-chinese text-spirit-glow text-2xl mx-1 animate-spirit-glow">${char}</span>`;
  });

  // Handle strong (must come before em)
  remaining = remaining.replace(strongPattern, '<strong>$1</strong>');

  // Handle emphasis
  remaining = remaining.replace(emPattern, '<em class="text-spirit-glow not-italic">$1</em>');

  // Return as dangerously set HTML (safe since we control the Ink content)
  return [
    <span
      key={key}
      dangerouslySetInnerHTML={{ __html: remaining }}
    />,
  ];
}

export function Paragraph({ text, index, className }: ParagraphProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn('narrative-text mb-4', className)}
    >
      {parseInkText(text)}
    </motion.p>
  );
}
