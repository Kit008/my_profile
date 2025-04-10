import type { Metadata } from 'next';
import './globals.css';
import Image from 'next/image';
import logo from '/background/metal.webp'; // Your logo file in the `public` folder

export const metadata: Metadata = {
  icons: {
    icon: '/background/metal.webp',
    shortcut: '/favicon/icon.png',
    apple: '/favicon/apple-icon.png',
    other: {
      rel: 'icon',
      url: '/favicon/icon.ico',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}