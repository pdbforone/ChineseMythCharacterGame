'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface SpiritProps {
  character: string;
  pinyin?: string;
  meaning?: string;
  isBound?: boolean;
  showInfo?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeClasses = {
  small: 'text-4xl',
  medium: 'text-6xl md:text-8xl',
  large: 'text-8xl md:text-[10rem]',
};

export function Spirit({
  character,
  pinyin,
  meaning,
  isBound = false,
  showInfo = false,
  size = 'large',
  className,
}: SpiritProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('text-center py-8', className)}
    >
      {/* The character itself */}
      <motion.div
        className={cn(
          'font-chinese transition-all duration-500',
          sizeClasses[size],
          isBound ? 'text-spirit-bound' : 'text-spirit-glow'
        )}
        style={{
          textShadow: isBound
            ? '0 0 20px rgba(45, 90, 61, 0.6), 0 0 40px rgba(45, 90, 61, 0.3)'
            : '0 0 30px rgba(201, 162, 39, 0.7), 0 0 60px rgba(201, 162, 39, 0.4)',
        }}
        animate={
          isBound
            ? {}
            : {
                textShadow: [
                  '0 0 20px rgba(201, 162, 39, 0.5), 0 0 40px rgba(201, 162, 39, 0.2)',
                  '0 0 40px rgba(201, 162, 39, 0.8), 0 0 80px rgba(201, 162, 39, 0.5)',
                  '0 0 20px rgba(201, 162, 39, 0.5), 0 0 40px rgba(201, 162, 39, 0.2)',
                ],
              }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {character}
      </motion.div>

      {/* Info display */}
      {showInfo && (pinyin || meaning) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-6 space-y-2"
        >
          {pinyin && (
            <p className="font-ui text-ink-faded text-lg tracking-wide">
              {pinyin}
            </p>
          )}
          {meaning && (
            <p className="font-body text-ink text-xl">
              {meaning}
            </p>
          )}
        </motion.div>
      )}

      {/* Bound/Unbound stamp */}
      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: -3 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="mt-6"
      >
        <span
          className={cn(
            'bureau-stamp',
            isBound && 'bureau-stamp-bound'
          )}
        >
          {isBound ? '已綁定 BOUND' : '未綁定 UNBOUND'}
        </span>
      </motion.div>
    </motion.div>
  );
}
