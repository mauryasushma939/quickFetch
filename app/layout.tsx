import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuickFetch - Legal Video Metadata & Embedding Tool',
  description: 'A privacy-focused tool for fetching video metadata and embedding legally available content',
  keywords: ['video', 'metadata', 'embedding', 'legal', 'privacy'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
