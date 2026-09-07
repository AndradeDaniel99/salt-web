import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Salt Web',
  description:
    'A demo experience for discovering, supporting, and following fictional mission campaigns.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
