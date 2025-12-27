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
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
