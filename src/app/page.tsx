'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TitleScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8">
      {/* Background atmosphere */}
      <div className="fixed inset-0 bg-gradient-radial from-paper/20 via-void to-void pointer-events-none" />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center"
      >
        {/* Chinese title */}
        <motion.h1
          className="font-chinese text-spirit-glow text-4xl md:text-6xl mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.5 }}
          style={{
            textShadow: '0 0 30px rgba(201, 162, 39, 0.5), 0 0 60px rgba(201, 162, 39, 0.2)',
          }}
        >
          遺忘字靈部
        </motion.h1>

        {/* English title */}
        <motion.h2
          className="font-body text-ink text-xl md:text-2xl tracking-wide mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          The Ministry of Forgotten Characters
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="font-ui text-ink-faded text-sm tracking-widest uppercase mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          Celestial Bureaucracy • Spirit Binding Division
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="w-32 h-px bg-gradient-to-r from-transparent via-ink-faded to-transparent mx-auto mb-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        />

        {/* Menu options */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Link href="/game">
            <motion.button
              className="block w-64 mx-auto px-8 py-4 bg-paper border border-ink-faded/30
                         text-ink font-body text-lg hover:border-spirit-glow/50
                         hover:bg-paper-aged transition-all duration-300"
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(201, 162, 39, 0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              Begin New Case
            </motion.button>
          </Link>

          <motion.button
            className="block w-64 mx-auto px-8 py-4 bg-transparent border border-ink-faded/20
                       text-ink-faded font-body text-lg hover:border-ink-faded/40
                       hover:text-ink transition-all duration-300 cursor-not-allowed opacity-50"
            disabled
          >
            Continue Investigation
          </motion.button>

          <motion.button
            className="block w-64 mx-auto px-8 py-4 bg-transparent border border-ink-faded/20
                       text-ink-faded font-body text-lg hover:border-ink-faded/40
                       hover:text-ink transition-all duration-300 cursor-not-allowed opacity-50"
            disabled
          >
            Review Bound Spirits
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="mt-16 text-ink-faded/50 text-sm font-ui"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          案件 #001 available
        </motion.p>
      </motion.div>
    </main>
  );
}
