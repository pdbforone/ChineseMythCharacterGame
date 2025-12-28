'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useEffect, useState } from 'react';

interface SpiritProps {
  character: string;
  pinyin?: string;
  meaning?: string;
  isBound?: boolean;
  showInfo?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onBind?: () => void;
}

const sizeClasses = {
  small: 'text-4xl',
  medium: 'text-6xl md:text-8xl',
  large: 'text-8xl md:text-[10rem]',
};

// Floating particles around the character
function SpiritParticles({ count = 8, isBound = false }: { count?: number; isBound?: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            'absolute w-1 h-1 rounded-full',
            isBound ? 'bg-spirit-bound' : 'bg-spirit-glow'
          )}
          initial={{
            x: '50%',
            y: '50%',
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: `${50 + Math.cos((i / count) * Math.PI * 2) * 40}%`,
            y: `${50 + Math.sin((i / count) * Math.PI * 2) * 40}%`,
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

// Binding flash effect
function BindingFlash({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute inset-0 bg-spirit-glow rounded-full"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 2, 2.5] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  );
}

export function Spirit({
  character,
  pinyin,
  meaning,
  isBound = false,
  showInfo = false,
  size = 'large',
  className,
  onBind
}: SpiritProps) {
  const [showBindFlash, setShowBindFlash] = useState(false);
  const [prevBound, setPrevBound] = useState(isBound);

  // Detect when character becomes bound
  useEffect(() => {
    if (isBound && !prevBound) {
      setShowBindFlash(true);
      onBind?.();
      setTimeout(() => setShowBindFlash(false), 800);
    }
    setPrevBound(isBound);
  }, [isBound, prevBound, onBind]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn('relative text-center py-12', className)}
    >
      {/* Particle effects */}
      <SpiritParticles isBound={isBound} />

      {/* Binding flash */}
      <BindingFlash active={showBindFlash} />

      {/* Outer glow ring */}
      <motion.div
        className={cn(
          'absolute inset-0 m-auto w-48 h-48 md:w-64 md:h-64 rounded-full opacity-20',
          isBound ? 'bg-spirit-bound' : 'bg-spirit-glow'
        )}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ filter: 'blur(40px)' }}
      />

      {/* The character itself */}
      <motion.div
        className={cn(
          'relative font-chinese transition-colors duration-700',
          sizeClasses[size],
          isBound ? 'text-spirit-bound' : 'text-spirit-glow'
        )}
        animate={
          isBound
            ? { y: 0 }
            : {
                y: [-5, 5, -5],
                textShadow: [
                  '0 0 30px rgba(201, 162, 39, 0.5), 0 0 60px rgba(201, 162, 39, 0.2)',
                  '0 0 50px rgba(201, 162, 39, 0.8), 0 0 100px rgba(201, 162, 39, 0.4)',
                  '0 0 30px rgba(201, 162, 39, 0.5), 0 0 60px rgba(201, 162, 39, 0.2)',
                ]
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          textShadow: isBound
            ? '0 0 20px rgba(45, 90, 61, 0.6), 0 0 40px rgba(45, 90, 61, 0.3)'
            : '0 0 40px rgba(201, 162, 39, 0.7), 0 0 80px rgba(201, 162, 39, 0.4)'
        }}
      >
        {character}
      </motion.div>

      {/* Info display with stagger animation */}
      {showInfo && (pinyin || meaning) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative mt-8 space-y-3"
        >
          {pinyin && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-ui text-ink-faded text-xl tracking-widest"
            >
              {pinyin}
            </motion.p>
          )}
          {meaning && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="font-body text-ink text-2xl"
            >
              {meaning}
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Bound/Unbound stamp with seal effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ delay: 0.8, duration: 0.4, type: 'spring' }}
        className="relative mt-8"
      >
        <span
          className={cn(
            'bureau-stamp text-base',
            isBound && 'bureau-stamp-bound'
          )}
        >
          {isBound ? '已綁定 BOUND' : '未綁定 UNBOUND'}
        </span>
      </motion.div>
    </motion.div>
  );
}
