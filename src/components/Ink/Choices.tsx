'use client';

import { motion } from 'framer-motion';
import { useStory } from './StoryProvider';
import { cn } from '@/lib/cn';

interface ChoicesProps {
  className?: string;
}

export function Choices({ className }: ChoicesProps) {
  const { choices, makeChoice } = useStory();

  if (choices.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={cn('space-y-2 mt-6', className)}
    >
      {choices.map((choice, index) => (
        <motion.button
          key={choice.index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
          onClick={() => makeChoice(choice.index)}
          className="choice-button group"
        >
          <span className="text-ink-faded group-hover:text-spirit-glow transition-colors mr-3">
            ▸
          </span>
          {choice.text}
        </motion.button>
      ))}
    </motion.div>
  );
}
