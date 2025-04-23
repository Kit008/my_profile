'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import anime from 'animejs';

export default function About() {
  const animationRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'contact', name: 'Contact' }
  ];

  useEffect(() => {
    // Background particles animation
    const createParticles = () => {
      if (!backgroundRef.current) return;
      
      const particles = [];
      const particleCount = 20; // orangeuced for better performance
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full bg-orange-500/20';
        particle.style.width = `${Math.random() * 8 + 3}px`; // Smaller particles
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
        duration: () => anime.random(8000, 20000), // Slower movement
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
      });
    };

    // Main animations
    const initAnimations = () => {
      if (!animationRef.current) return;

      // Animation timeline
      const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
      });

      // Animate introduction elements
      tl.add({
        targets: '.intro-text',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(150)
      }).add({
        targets: '.skill-bar',
        width: ['0%', '100%'],
        opacity: [0, 1],
        delay: anime.stagger(50),
        easing: 'spring(1, 80, 10, 0)'
      }, '-=800').add({
        targets: '.timeline-item',
        opacity: [0, 1],
        translateX: [-30, 0],
        delay: anime.stagger(50),
        duration: 800
      }).add({
        targets: '.tech-item',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutBack'
      });

      // Floating avatar animation
      anime({
        targets: '.floating-avatar',
        translateY: [-10, 10],
        duration: 4000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    };

    // Setup hover effects
    const setupHoverEffects = () => {
      document.querySelectorAll('.experience-card').forEach((card) => {
        const hoverAnimation = anime({
          targets: card,
          scale: 1.03,
          duration: 300,
          easing: 'easeOutQuad',
          autoplay: false
        });

        card.addEventListener('mouseenter', () => hoverAnimation.play());
        card.addEventListener('mouseleave', () => hoverAnimation.reverse());
      });

      document.querySelectorAll('.stat-card').forEach((card) => {
        const hoverAnimation = anime({
          targets: card,
          scale: 1.05,
          duration: 300,
          easing: 'easeOutElastic',
          autoplay: false
        });

        card.addEventListener('mouseenter', () => hoverAnimation.play());
        card.addEventListener('mouseleave', () => hoverAnimation.reverse());
      });

      document.querySelectorAll('.tech-item').forEach((item) => {
        const hoverAnimation = anime({
          targets: item,
          translateY: -8,
          duration: 200,
          easing: 'easeOutQuad',
          autoplay: false
        });

        item.addEventListener('mouseenter', () => hoverAnimation.play());
        item.addEventListener('mouseleave', () => hoverAnimation.reverse());
      });
    };

    createParticles();
    initAnimations();
    setupHoverEffects();

    return () => {
      // Cleanup animations if needed
      anime.remove('.intro-text, .skill-bar, .timeline-item, .tech-item, .floating-avatar');
    };
  }, []);

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Full Screen Background Image */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/webp_image/drawn.webp"
          alt="Night background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Animated Particles */}
      <div ref={backgroundRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"></div>
      
      <div className="fixed inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern bg-cover"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full p-5 flex justify-between items-center backdrop-blur-md z-50 bg-black/30 border-b border-gray-800/50">
        <a href='../' className="text-white text-xl font-semibold hover:text-orange-400 transition-colors cursor-pointer">
          MyProfile
        </a>
        <div className="flex gap-5">
          {sections.map(section => (
            <Link 
              key={section.id}
              href={`/${section.id === 'home' ? '' : section.id}`}
              className={`text-white hover:text-orange-400 transition-colors ${
                section.id === 'about' ? 'text-orange-400 font-medium' : ''
              }`}
            >
              {section.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Floating Avatar */}
      <a href="/contact" className="floating-avatar fixed right-10 top-3/5 z-20 w-40 h-40 rounded-full overflow-hidden hidden lg:block border-4 border-orange-500/30 shadow-lg">
        <Image 
          src="/image/stand.webp" 
          alt="Profile" 
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </a>

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
        {/* Introduction Section */}
        <div ref={animationRef} className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 intro-text opacity-0">
            About <span className="text-orange-400">Me</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg md:text-xl mb-4 intro-text opacity-0">
                Hello! I'm Andy Tong, a passionate software developer and devops engineer
                with 3+ years of experience in the industry.
              </p>
              <p className="text-lg md:text-xl mb-6 intro-text opacity-0">
                My journey began in Data science where I actively apply 
                my knowledge to solve real-world challenges
                when I working in  
                <span className = "text-orange-400"> Lenovo PCCW Solution AI digital team</span>.
              </p>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { value: '3+', label: 'Years Experience' },
                  { value: '10+', label: 'Projects' },
                  { value: '100%', label: 'Dedication' }
                ].map((stat, i) => (
                  <div 
                    key={i} 
                    className="stat-card bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-orange-400 transition-all cursor-default"
                  >
                    <div className="text-2xl font-bold text-orange-400">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Skills */}
            <div className="space-y-4">
              {[
                { skill: 'AI software Development', level: '80%' },
                { skill: 'CI/CD pipeline', level: '75%' },
                { skill: 'Docker/ K8s', level: '65%' }
              ].map((item) => (
                <div key={item.skill} className="skill-bar opacity-0">
                  <div className="flex justify-between mb-1">
                    <span>{item.skill}</span>
                    <span>{item.level}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-300 h-2.5 rounded-full" 
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 intro-text">My Journey</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-gradient-to-b before:from-orange-500 before:to-transparent">
            {[
              {
                year: '2023-Present',
                role: 'Senior Technical Officer',
                company: 'Lenovo PCCW Solutions',
                description: 'Sole responsible person for DevOps and software development'
              },
              {
                year: '2021-2023',
                role: 'Digital Markeing Strategist',
                company: 'Learnsmart Education',
                description: 'Use Nextjs framework in develop website and responsible for all the website SEO matters'
              },
              // {
              //   year: '2016-2018',
              //   role: 'Junior Developer',
              //   company: 'Web Solutions',
              //   description: 'Built responsive websites and learned modern development practices.'
              // }
            ].map((item, index) => (
              <div 
                key={index} 
                className="relative pl-10 group timeline-item opacity-0"
              >
                <div className="absolute left-0 w-4 h-4 rounded-full bg-orange-500 border-4 border-gray-800 group-hover:bg-orange-300 transition-colors z-10"></div>
                <div className="experience-card bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-800/70 transition-all border border-gray-700 hover:border-orange-400">
                  <span className="text-orange-400">{item.year}</span>
                  <h3 className="text-xl font-semibold mt-1">{item.role} @ {item.company}</h3>
                  <p className="mt-2 text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 intro-text">Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: 'Azure DevOps', icon: '🔄' },
              { name: 'Azure', icon: '☁️' },
              { name: 'Python', icon: '🐍' },
              { name: 'Modelling', icon: '📊' },
              { name: 'React', icon: '⚛️' },
              { name: 'TypeScript', icon: '📘' },
              { name: 'MongoDB', icon: '🍃' },
              { name: 'Docker', icon: '🐳' },
              { name: 'AWS', icon: '📟' },
              { name: 'Figma', icon: '✏️' }
            ].map((tech, i) => (
              <div 
                key={i} 
                className="tech-item bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700 hover:border-orange-400 transition-all cursor-default opacity-0"
              >
                <div className="text-2xl mb-2">{tech.icon}</div>
                <div>{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}