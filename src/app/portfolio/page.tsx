'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectModal from '@/components/ProjectModal';
import anime from 'animejs';
import NavBar from '@/components/NavBar';
import AnimatedBackground from '@/components/Background';

type Project = {
  id: number;
  title: string;
  image: string;
  coverTitle?: string;
  innerImage?: string;
  description: string;
  tags: string[];
};

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "5+ LLM application project",
      coverTitle: "LLM application",
      image: "/webp_image/purple_city.webp",
      innerImage: "/webp_image/llm_box.webp",
      description: "Responsible for DevOps across multiple LLM applications, participate in frontend development and UI design. Including managing the Azure DevOps pipeline for continuous integration process, and GitHub version control assistance",
      tags: ["Vue.js", "Azure DevOps", "Figma"]
    },
    {
      id: 2,
      title: "Speech to Text development",
      coverTitle: "STT development",
      image: "/webp_image/tree.webp",
      innerImage: "/webp_image/speech2text.webp",
      description: "Responsible for developing the audio preprocessing component for speech-to-text applications, overseeing DevOps for the project, and conducting evaluations. Additionally, partly contributing to STT model fine-tuning.",
      tags: ["Python", "Devops", "Modelling"]
    },
    {
      id: 3,
      title: "Video Analytics Project",
      coverTitle: "Video Analytics Project frontend and DevOps",
      image: "/webp_image/castle.webp",
      innerImage: "/webp_image/video_analytics.webp",
      description: "Responsible for DevOps and UAT testing for the video_anlytics project",
      tags: ["JavaScript", "Devops", "UAT"]
    },
    {
      id: 4,
      title: "Learnsmart Education website",
      coverTitle: "Learnsmart Education SEO and frontend",
      image: "/webp_image/upper_view.webp",
      innerImage: "/webp_image/learnsmart.webp",
      description: "Responsible for frontend development, UI/UX design and SEO optimization",
      tags: ["JavaScript", "Figma", "SEO"]
    },
    
    // Add more projects as needed
  ];

  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'contact', name: 'Contact' }
  ];

  // Effect 1: Fullscreen night background with stars
  useEffect(() => {
    // Create stars
    const createStars = () => {
      if (!containerRef.current) return;
      
      const stars = [];
      const starCount = 100;
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'absolute rounded-full bg-white';
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
        containerRef.current.appendChild(star);
        stars.push(star);
      }

      // Twinkling animation
      anime({
        targets: stars,
        opacity: [
          { value: 0.2, duration: 0 },
          { value: () => anime.random(0.5, 1), duration: 2000 },
          { value: 0.2, duration: 2000 }
        ],
        easing: 'easeInOutSine',
        loop: true,
        delay: anime.stagger(100)
      });

      // Shooting stars
      setInterval(() => {
        if (Math.random() > 0.3) return;
        
        const shootingStar = document.createElement('div');
        shootingStar.className = 'absolute bg-white h-0.5 w-16';
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.top = `${Math.random() * 100}%`;
        shootingStar.style.transform = 'rotate(-45deg)';
        shootingStar.style.opacity = '0';
        containerRef.current?.appendChild(shootingStar);

        anime({
          targets: shootingStar,
          opacity: [0, 1, 0],
          translateX: ['-100px', '100px'],
          translateY: ['-100px', '100px'],
          duration: 1000,
          easing: 'easeOutQuad',
          complete: () => {
            shootingStar.remove();
          }
        });
      }, 3000);
    };

    createStars();
  }, []);

  // Effect 2: Title animation
  useEffect(() => {
    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
      });
    }
  }, []);

  // Effect 3: Project cards staggered entrance animation
  useEffect(() => {
    anime({
      targets: projectRefs.current.filter(Boolean),
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800,
      delay: anime.stagger(100, { start: 300 }),
      easing: 'easeOutExpo'
    });
  }, []);

  // Effect 4: Hover animations for project cards
  useEffect(() => {
    projectRefs.current.forEach((card, index) => {
      if (!card) return;

      card.addEventListener('mouseenter', () => {
        anime({
          targets: card,
          scale: 1.03,
          duration: 300,
          easing: 'easeOutExpo'
        });
        
        // Inner image floating effect
        const innerImage = card.querySelector('.inner-image-container');
        if (innerImage) {
          anime({
            targets: innerImage,
            translateY: [10, -10],
            duration: 3000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
          });
        }

        // Tags pulse effect
        const tags = card.querySelectorAll('.project-tag');
        anime({
          targets: tags,
          scale: [1, 1.1],
          duration: 300,
          delay: anime.stagger(50),
          direction: 'alternate',
          easing: 'easeOutExpo'
        });
      });

      card.addEventListener('mouseleave', () => {
        anime({
          targets: card,
          scale: 1,
          duration: 300,
          easing: 'easeOutExpo'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fullscreen night background */}
      <AnimatedBackground imageAddress={'/webp_image/night.webp'}/>

      {/* Floating grid overlay */}
      <div className="fixed inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern bg-cover"></div>
      </div>

      <NavBar currentPage='portfolio' themeColor='blue-400'/>

      <div className="pt-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-white opacity-0"
        >
          My <span className="text-blue-400">Portfolio</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              ref={(el: HTMLHeadingElement | null) => {projectRefs.current[index] = el}}
              className="group relative bg-white/10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer backdrop-blur-sm border border-white/10 hover:border-blue-400/30 opacity-0"
              onClick={() => {
                setSelectedProject(project);
                anime({
                  targets: projectRefs.current[index],
                  scale: [1, 0.95, 1],
                  duration: 500,
                  easing: 'easeOutElastic'
                });
              }}
            >
              {/* Outer frame with cover title */}
              <div className="relative aspect-square">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                {/* Cover title overlay */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="text-white text-2xl font-bold text-center p-4">
                    {project.coverTitle || project.title}
                  </h3>
                </div>
              </div>

              {/* Inner frame image (shown on hover) */}
              {project.innerImage && (
                <div className="absolute inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none inner-image-container">
                  <div className="relative h-full w-full border-4 border-white/30 rounded-lg overflow-hidden">
                    <Image
                      src={project.innerImage}
                      alt={`${project.title} inner view`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="project-tag bg-blue-500/20 px-2 py-1 rounded text-sm text-blue-200 hover:bg-blue-500/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <ProjectModal 
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </div>
  );
}