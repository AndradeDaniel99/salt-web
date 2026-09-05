import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Salt Web',
  description:
    'Protótipo web para descobrir, apoiar e acompanhar campanhas missionárias fictícias.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body>{children}</body>
    </html>
  );
}
