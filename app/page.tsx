'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import anime from 'animejs';

interface Section {
  id: string;
  title: string;
  content: string;
  bgImage: string;
  stateImage: string;
  bonusImage?: string;
  buttonLink?: string;
  buttonText?: string;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bonusShown, setBonusShown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const contentRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stateImageRef = useRef<HTMLDivElement>(null);
  
  const sections: Section[] = [
    { 
      id: 'home', 
      title: "Hello, I'm Andy   ", 
      content: "Welcome to my personal profile...",
      bgImage: '/background/first.png',
      stateImage: '/image/gentle_hi.png',
      bonusImage: '/speak/speak_hello.png',
      buttonLink: '/about',
      buttonText: 'Learn More'
    },
    { 
      id: 'about', 
      title: "About Me", 
      content: "I have X years of experience...",
      bgImage: '/background/street_1.png',
      stateImage: '/image/relax.png',
      bonusImage: '/speak/speak_nice.png',
      buttonLink: '/about',
      buttonText: 'Learn More'
    },
    { 
      id: 'portfolio', 
      title: "My Portfolio", 
      content: "Here are my recent projects...",
      bgImage: '/background/sunset.png',
      stateImage: '/image/should_be.png',
      buttonLink: '/portfolio',
      buttonText: 'View Portfolio'
    },
    { 
      id: 'contact', 
      title: "Let's Connect", 
      content: "Get in touch with me...",
      bgImage: '/background/river_view.png',
      stateImage: '/image/gentle_call.png',
      buttonLink: '/contact',
      buttonText: 'Contact Me'
    }
  ];

  // Effect 1: Text animation when section changes
  useEffect(() => {
    // Animate titles
    anime({
      targets: titleRefs.current.filter(Boolean),
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(100)
    });

    // Animate content
    anime({
      targets: contentRefs.current.filter(Boolean),
      translateX: [-20, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(100)
    });

    // Animate buttons
    anime({
      targets: buttonRefs.current.filter(Boolean),
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutElastic',
      delay: 300
    });
  }, [activeSection]);

  // Effect 2: State image floating animation
  useEffect(() => {
    if (stateImageRef.current) {
      anime({
        targets: stateImageRef.current,
        translateY: [10, -10],
        duration: 3000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    }
  }, [activeSection]);

  // Effect 3: Interactive hover effects for buttons
  const setupButtonHoverEffects = useCallback(() => {
    buttonRefs.current.forEach((button) => {
      if (!button) return;
      
      button.addEventListener('mouseenter', () => {
        anime({
          targets: button,
          scale: 1.05,
          duration: 200,
          easing: 'easeOutQuad'
        });
      });
      
      button.addEventListener('mouseleave', () => {
        anime({
          targets: button,
          scale: 1,
          duration: 200,
          easing: 'easeOutQuad'
        });
      });
    });
  }, []);

  // Effect 4: Text color pulse on scroll
  useEffect(() => {
    const handleScroll = () => {
      anime({
        targets: titleRefs.current.filter(Boolean),
        color: [
          { value: '#ffffff' }, // white
          { value: '#C0c0c0' }, // silver
          { value: '#ffffff' }  // back to white
        ],
        duration: 1000,
        easing: 'easeInOutSine'
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setupButtonHoverEffects();
  }, [setupButtonHoverEffects]);

  // Reset timer when section changes
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    if (bonusShown !== activeSection) {
      setBonusShown(null);
    }
    
    const currentSection = sections.find(s => s.id === activeSection);
    if (currentSection?.bonusImage && bonusShown !== activeSection) {
      timerRef.current = setTimeout(() => {
        setBonusShown(activeSection);
        // Bonus image animation when shown
        anime({
          targets: '.bonus-image',
          scale: [0.8, 1.1, 1],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutElastic'
        });
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeSection, sections, bonusShown]);

  const [homeRef, homeInView] = useInView({ threshold: 0.5 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.5 });
  const [portfolioRef, portfolioInView] = useInView({ threshold: 0.5 });
  const [contactRef, contactInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (homeInView) setActiveSection('home');
    else if (aboutInView) setActiveSection('about');
    else if (portfolioInView) setActiveSection('portfolio');
    else if (contactInView) setActiveSection('contact');
  }, [homeInView, aboutInView, portfolioInView, contactInView]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const scrollTop = window.scrollY;
    const section = document.getElementById(activeSection);
    
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const progress = (scrollTop - sectionTop) / (sectionHeight - windowHeight);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    }
  }, [activeSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    portfolio: portfolioRef,
    contact: contactRef
  } as const;

  const contentVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 }
  };

  const currentSection = sections.find(section => section.id === activeSection) || sections[0];

  return (
    <div className="relative" ref={containerRef}>
      {/* Fixed stateImage in right corner */}
      <div 
        className="fixed bottom-8 right-8 z-30 w-[clamp(192px,24vw,576px)] h-[clamp(192px,24vw,576px)]"
        ref={stateImageRef}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.3 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full relative"
          >
            <Image
              src={currentSection.stateImage}
              alt={`${currentSection.id} state image`}
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Persistent bonus image */}
      {currentSection.bonusImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: bonusShown === currentSection.id ? 1 : 0,
            transition: { duration: 0.5 }
          }}
          className="fixed bottom-25 right-[20vw] z-30 w-[clamp(125px,18vw,390px)] h-[clamp(231px,28vw,640px)] bonus-image"
        >
          <Image
            src={currentSection.bonusImage}
            alt={`${currentSection.id} bonus content`}
            fill
            className="object-contain"
            quality={100}
          />
        </motion.div>
      )}

      {/* Section Background Images */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: activeSection === section.id ? 1 : 0,
              scale: activeSection === section.id ? 1 : 1.05,
              transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
            }}
          >
            <Image
              src={section.bgImage}
              alt={`${section.id} background`}
              fill
              className="object-cover"
              quality={100}
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-5 flex justify-between items-center backdrop-blur-lg z-50">
        <div className="text-white text-xl font-semibold">MyProfile</div>
        <div className="flex gap-5">
          {sections.map(section => (
            <Link 
              key={section.id}
              href={`/${section.id === 'home' ? '' : section.id}`}
              className={`text-white hover:text-zinc-400 transition-colors ${
                activeSection === section.id ? 'text-zinc-400 font-medium' : ''
              }`}
              aria-current={activeSection === section.id ? 'page' : undefined}
            >
              {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
            </Link>
          ))}
        </div>
      </nav>

      {/* Sections */}
      <main>
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            ref={sectionRefs[section.id as keyof typeof sectionRefs]}
            className="min-h-screen flex flex-col justify-center px-10 py-20 relative"
          >
            <div className="max-w-4xl mx-auto">
              <h1 
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
                ref={(el: HTMLHeadingElement | null) => {
                  titleRefs.current[index] = el;
                }}
              >
                {section.title}
              </h1>
              <p 
                className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl"
                ref={(el: HTMLHeadingElement | null) => {contentRefs.current[index] = el}}
              >
                {section.content}
              </p>
              {section.buttonLink && (
                <div
                  ref={(el: HTMLHeadingElement | null)=> {buttonRefs.current[index] = el}}
                >
                  <Link
                    href={section.buttonLink}
                    className="inline-block px-8 py-3 bg-zinc-400 text-white rounded-full hover:bg-grey-600 transition-colors"
                  >
                    {section.buttonText}
                  </Link>
                </div>
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}