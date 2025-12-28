import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Ministry of Forgotten Characters',
  description: 'An interactive fiction game where learning Chinese characters IS the gameplay.',
  keywords: ['Chinese', 'characters', 'learning', 'game', 'interactive fiction', 'mnemonics'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-void text-ink min-h-screen">
        {/* Atmospheric overlays */}
        <div className="vignette" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="ambient-glow" aria-hidden="true" />

        {/* Main content */}
        <div className="relative min-h-screen flex flex-col z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
