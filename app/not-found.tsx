'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import anime from 'animejs';

export default function NotFound() {

    useEffect(() => {
        anime({
            targets: 'h1',
            scale: [1.2, 1],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutElastic'
        });
        }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/background/alone_back.webp" 
          alt="404 Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-9xl font-bold text-white mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-white mb-6">Page Not Found</h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl">
          Oops! The page you're looking for doesn't exist, but you can <a className ='font-semibold underline text-zinc-300' href='../contact'>tell me</a> to create one.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}