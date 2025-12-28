'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface CaseFileProps {
  caseNumber: string;
  title: string;
  division?: string;
  children: React.ReactNode;
  className?: string;
}

export function CaseFile({
  caseNumber,
  title,
  division,
  children,
  className,
}: CaseFileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('max-w-3xl mx-auto', className)}
    >
      {/* Case file header */}
      <div className="bureau-document mb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-ui text-ink-faded text-xs tracking-widest uppercase">
              {division || 'General Division'}
            </p>
            <h1 className="font-body text-ink text-2xl mt-1">
              {title}
            </h1>
          </div>
          <div className="text-right">
            <p className="font-ui text-ink-faded text-xs tracking-widest">
              案件
            </p>
            <p className="font-chinese text-spirit-glow text-xl">
              #{caseNumber}
            </p>
          </div>
        </div>

        {/* Decorative line */}
        <div className="h-px bg-gradient-to-r from-ink-faded/30 via-ink-faded/10 to-transparent" />
      </div>

      {/* Case file content */}
      <div className="bureau-document">
        {children}
      </div>
    </motion.div>
  );
}
