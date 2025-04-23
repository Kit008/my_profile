'use client';
import { useEffect, useRef } from 'react';
import anime from 'animejs';
import Image from "next/image";

interface BackgroundProps {
    imageAddress?: string;  // Can be a path string or imported image
    themeColor?: string;   // Default to green-400 if not provided
}

export default function AnimatedBackground({
    imageAddress = '',    // Default empty string
    themeColor = 'rgb(74,222,123)'
}: BackgroundProps) {
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const createParticles = () => {
            if (!backgroundRef.current) return;
            
            const particles = [];
            const particleCount = 20;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = `absolute rounded-full bg-${themeColor}/20`;
                particle.style.width = `${Math.random() * 8 + 3}px`;
                particle.style.height = particle.style.width;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                backgroundRef.current.appendChild(particle);
                particles.push(particle);
            }

            anime({
                targets: particles,
                translateX: () => anime.random(-30, 30),
                translateY: () => anime.random(-30, 30),
                duration: () => anime.random(8000, 20000),
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true
            });
        };

        createParticles();
    }, [themeColor]);  // Added themeColor to dependencies

    return (
        <>
            <div className="fixed inset-0 -z-20">
                {imageAddress && (
                    <Image
                        src={imageAddress}
                        alt="main background"
                        fill
                        className="object-cover"
                        quality={100}
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            </div>
            <div ref={backgroundRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"></div>
            <div className="fixed inset-0 -z-10 opacity-10">
                <div className="absolute inset-0 bg-grid-pattern bg-cover"></div>
            </div>
        </>
    );    
}