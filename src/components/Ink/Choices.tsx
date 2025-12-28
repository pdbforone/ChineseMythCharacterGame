'use client';

import { motion } from 'framer-motion';
import { useStory } from './StoryProvider';
import { cn } from '@/lib/cn';

interface ChoicesProps {
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export function Choices({ className }: ChoicesProps) {
  const { choices, makeChoice } = useStory();

  if (choices.length === 0) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('space-y-3 mt-8', className)}
    >
      {choices.map((choice) => (
        <motion.button
          key={choice.index}
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => makeChoice(choice.index)}
          className="choice-button group"
        >
          <span className="text-ink-faded group-hover:text-spirit-glow transition-colors mr-3">
            ▸
          </span>
          <span className="relative">
            {choice.text}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}
