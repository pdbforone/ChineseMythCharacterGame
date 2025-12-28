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

// Floating particles around the character - more visible
function SpiritParticles({ isBound = false }: { isBound?: boolean }) {
  const particles = Array.from({ length: 12 });
  const color = isBound ? 'rgba(45, 90, 61, 0.8)' : 'rgba(201, 162, 39, 0.9)';

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const radius = 100;
        const delay = i * 0.15;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 10,
              height: 10,
              backgroundColor: color,
              boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
            }}
            animate={{
              x: [
                Math.cos(angle) * radius * 0.4,
                Math.cos(angle) * radius,
                Math.cos(angle) * radius * 0.4,
              ],
              y: [
                Math.sin(angle) * radius * 0.4,
                Math.sin(angle) * radius,
                Math.sin(angle) * radius * 0.4,
              ],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}

// Binding flash effect
function BindingFlash({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(201, 162, 39, 0.6) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 2.5, 3] }}
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
      className={cn('relative text-center py-16 my-8', className)}
    >
      {/* Particle effects */}
      <SpiritParticles isBound={isBound} />

      {/* Binding flash */}
      <BindingFlash active={showBindFlash} />

      {/* Outer glow ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full pointer-events-none"
        style={{
          background: isBound
            ? 'radial-gradient(circle, rgba(45, 90, 61, 0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(201, 162, 39, 0.2) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* The character itself */}
      <motion.div
        className={cn(
          'relative font-chinese transition-colors duration-700 z-10',
          sizeClasses[size],
          isBound ? 'text-spirit-bound' : 'text-spirit-glow'
        )}
        animate={
          isBound
            ? { y: 0 }
            : {
                y: [-8, 8, -8],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          textShadow: isBound
            ? '0 0 30px rgba(45, 90, 61, 0.8), 0 0 60px rgba(45, 90, 61, 0.4)'
            : '0 0 40px rgba(201, 162, 39, 0.8), 0 0 80px rgba(201, 162, 39, 0.5), 0 0 120px rgba(201, 162, 39, 0.3)',
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
          className="relative mt-8 space-y-3 z-10"
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
        className="relative mt-8 z-10"
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
