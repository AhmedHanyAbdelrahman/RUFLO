import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Revenue Driven — Reactivation AI',
  description: 'Tekmetric-first revenue recovery for auto repair shops.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
