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
function SpiritParticles({ isBound = false }: { isBound?: boolean }) {
  const particles = Array.from({ length: 12 });
  const color = isBound ? 'rgba(45, 90, 61, 0.8)' : 'rgba(201, 162, 39, 0.9)';

  return (
    <>
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const radius = 120;
        const delay = i * 0.12;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 12,
              height: 12,
              backgroundColor: color,
              boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
              left: '50%',
              top: '50%',
              marginLeft: -6,
              marginTop: -6,
            }}
            animate={{
              x: [
                Math.cos(angle) * radius * 0.3,
                Math.cos(angle) * radius,
                Math.cos(angle) * radius * 0.3,
              ],
              y: [
                Math.sin(angle) * radius * 0.3,
                Math.sin(angle) * radius,
                Math.sin(angle) * radius * 0.3,
              ],
              opacity: [0.3, 1, 0.3],
              scale: [0.6, 1.3, 0.6],
            }}
            transition={{
              duration: 2.5,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </>
  );
}

// Binding flash effect
function BindingFlash({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 300,
            height: 300,
            left: '50%',
            top: '50%',
            marginLeft: -150,
            marginTop: -150,
            background: 'radial-gradient(circle, rgba(201, 162, 39, 0.8) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: [0, 1, 0], scale: [0.3, 1.5, 2] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  );
}

// Glow ring behind character
function GlowRing({ isBound = false }: { isBound?: boolean }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 250,
        height: 250,
        left: '50%',
        top: '50%',
        marginLeft: -125,
        marginTop: -125,
        background: isBound
          ? 'radial-gradient(circle, rgba(45, 90, 61, 0.3) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(201, 162, 39, 0.25) 0%, transparent 70%)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
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
      setTimeout(() => setShowBindFlash(false), 600);
    }
    setPrevBound(isBound);
  }, [isBound, prevBound, onBind]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn('text-center py-8', className)}
    >
      {/* Character wrapper - particles orbit around this */}
      <div
        className="relative flex items-center justify-center mx-auto"
        style={{ width: 280, height: 280 }}
      >
        {/* Glow ring */}
        <GlowRing isBound={isBound} />

        {/* Particle effects */}
        <SpiritParticles isBound={isBound} />

        {/* Binding flash */}
        <BindingFlash active={showBindFlash} />

        {/* The character itself - centered via flexbox */}
        <motion.div
          className={cn(
            'font-chinese z-10',
            sizeClasses[size],
            isBound ? 'text-spirit-bound' : 'text-spirit-glow'
          )}
          animate={
            isBound
              ? { y: 0 }
              : { y: [-6, 6, -6] }
          }
          transition={{
            duration: 3,
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
      </div>

      {/* Info display */}
      {showInfo && (pinyin || meaning) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 space-y-2"
        >
          {pinyin && (
            <p className="font-ui text-ink-faded text-xl tracking-widest">
              {pinyin}
            </p>
          )}
          {meaning && (
            <p className="font-body text-ink text-2xl">
              {meaning}
            </p>
          )}
        </motion.div>
      )}

      {/* Bound/Unbound stamp */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ delay: 0.8, duration: 0.4, type: 'spring' }}
        className="mt-6"
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
