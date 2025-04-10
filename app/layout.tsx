import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Personal Profile',
  description: 'Personal profile website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}