'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import anime from 'animejs';

interface NavBarProps {
    currentPage?: string;
    themeColor?: string; // Default to green-400 if not provided
}

export default function NavBar({ 
    currentPage, 
    themeColor = 'rgb(74, 222, 128)' 
}: NavBarProps) {
    const sections = [
        { id: 'home', name: 'Home' },
        { id: 'about', name: 'About' },
        { id: 'portfolio', name: 'Portfolio' },
        { id: 'contact', name: 'Contact' }
    ];
  // Animation for navbar entrance
    useEffect(() => {
        anime({
        targets: '.nav-link',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        delay: anime.stagger(100),
        easing: 'easeOutExpo'
    });

    // Hover animations for links
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
            targets: link,
            scale: 1.05,
            color: `var(--${themeColor})`,
            duration: 300,
            easing: 'easeOutBack'
            });
        });

        link.addEventListener('mouseleave', () => {
            anime({
            targets: link,
            scale: 1,
            color: link.classList.contains('current-page') ? 
                    `var(--${themeColor})` : '#ffffff',
            duration: 300,
            easing: 'easeOutQuad'
            });
        });
    });

    return () => {
        links.forEach(link => {
            link.removeEventListener('mouseenter', () => {});
            link.removeEventListener('mouseleave', () => {});
        });
        };
    }, [themeColor]);

    return (
        <nav className="fixed top-0 left-0 w-full p-5 flex justify-between items-center backdrop-blur-lg 
        z-50 bg-black/30">
        <a 
            href='/' 
            className="text-white text-xl font-semibold transition-colors hover:text-[--theme-color]"
            style={{
            '--theme-color': themeColor
            } as React.CSSProperties}
        >
            MyProfile
        </a>
        <div className="flex gap-5">
            {sections.map((section) => (
            <Link 
                key={section.id}
                href={`/${section.id === 'home' ? '' : section.id}`}
                className={`nav-link text-white transition-colors hover:text-[--theme-color] ${
                    section.id === currentPage ? 'font-medium' : ''
                }`}
                style={{
                    color: section.id === currentPage ? themeColor : undefined,
                    '--theme-color': themeColor
                } as React.CSSProperties}
                >
                {section.name}
            </Link>
            ))}
        </div>
        </nav>
    );
}