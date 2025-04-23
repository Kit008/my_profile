'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import anime from 'animejs';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Contact() {
  const characterRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init('IOz7ioMAW7PgJyrGx'); // Your public key
  }, []);

  // Enhanced floating character animation
  useEffect(() => {
    if (!characterRef.current) return;

    const floatAnim = anime({
      targets: characterRef.current,
      translateY: [-15, 15],
      duration: 4000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    const randomAnimations = () => {
      setTimeout(() => {
        // Blink animation
        anime({
          targets: characterRef.current?.querySelector('.character-eyes'),
          scaleY: [1, 0.05, 1],
          duration: 300,
          easing: 'easeOutQuad'
        });

        // Head tilt
        anime({
          targets: characterRef.current,
          rotateZ: [0, anime.random(-15, 15), 0],
          duration: 1200,
          easing: 'easeInOutQuad'
        });

        // Wave animation
        if (Math.random() > 0.6) {
          anime({
            targets: characterRef.current?.querySelector('.character-hand'),
            rotateZ: [0, 45, 0],
            duration: 1000,
            easing: 'easeInOutQuad'
          });
        }

        randomAnimations();
      }, anime.random(4000, 12000));
    };

    randomAnimations();

    return () => {
      floatAnim.pause();
    };
  }, []);

  // Form input animations with spring effect
  useEffect(() => {
    anime({
      targets: '.form-input',
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
      delay: anime.stagger(200, { start: 300 }),
      easing: 'spring(1, 100, 15, 0)'
    });

    // Enhanced hover/focus effects
    inputRefs.current.forEach(input => {
      if (!input) return;
      
      input.addEventListener('focus', () => {
        anime({
          targets: input,
          scale: 1.03,
          borderColor: '#4ade80',
          boxShadow: '0 0 0 3px rgba(74, 222, 128, 0.2)',
          duration: 400,
          easing: 'easeOutBack'
        });
        
        const label = input.previousElementSibling;
        if (label) {
          anime({
            targets: label,
            color: '#4ade80',
            translateX: 5,
            duration: 300
          });
        }
      });
      
      input.addEventListener('blur', () => {
        anime({
          targets: input,
          scale: 1,
          borderColor: 'rgba(255,255,255,0.2)',
          boxShadow: 'none',
          duration: 400,
          easing: 'easeOutQuad'
        });

        const label = input.previousElementSibling;
        if (label) {
          anime({
            targets: label,
            color: 'rgba(255,255,255,0.8)',
            translateX: 0,
            duration: 300
          });
        }
      });
    });
  }, []);

  // Enhanced submit handler with better animations
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Form validation with shake animation
    if (!formRef.current?.checkValidity()) {
      anime({
        targets: formRef.current,
        translateX: [0, 15, -15, 10, -10, 5, -5, 0],
        duration: 800,
        easing: 'easeInOutQuad'
      });
      
      // Highlight invalid fields
      anime({
        targets: 'input:invalid, textarea:invalid',
        borderColor: ['rgba(255,255,255,0.2)', '#ef4444'],
        backgroundColor: ['rgba(255,255,255,0.1)', 'rgba(239, 68, 68, 0.1)'],
        duration: 500,
        easing: 'easeInOutQuad'
      });
      
      setIsSubmitting(false);
      return;
    }

    // Capture form data
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string, 
      message: formData.get('message') as string,
    };
    setSubmittedData(data);
    
     // Combine customer email with message
     const fullMessage = `Customer Email: ${data.email}\n\nMessage:\n${data.message}`;

     // Prepare EmailJS parameters
     const templateParams = {
       from_name: data.name,
       from_email: 'fecesman18@gmail.com', // Your constant email
       to_email: 'fecesman18@gmail.com', // Your constant email
       cus_email: data.email, // Customer's email
       message: fullMessage // Combined message
     };
    

    // Button press animation
    await anime({
      targets: '.submit-btn',
      scale: [1, 0.92],
      duration: 200,
      easing: 'easeOutQuad'
    }).finished;

    // Loading animation
    anime({
      targets: '.submit-btn .btn-text',
      opacity: 0,
      translateY: 15,
      duration: 200,
      easing: 'easeOutQuad'
    });

    anime({
      targets: '.submit-btn .loading-dots',
      opacity: [0, 1],
      translateY: [-15, 0],
      duration: 400,
      easing: 'easeOutBack'
    });

    try {
      // Send email via EmailJS
      const response = await emailjs.send(
        'service_lf3da8g', // Your service ID
        'template_g4vqd9u', // Your template ID
        templateParams,
        'IOz7ioMAW7PgJyrGx' // Your public key
      );

      console.log('Email sent successfully:', response);

      // Success animation sequence
      setSubmitSuccess(true);
      
      // Form fly out animation
      anime({
        targets: formRef.current,
        opacity: [1, 0],
        translateY: [0, -100],
        duration: 600,
        easing: 'easeInOutQuad'
      });

      // Success message fly in
      anime({
        targets: successRef.current,
        opacity: [0, 1],
        translateY: [80, 0],
        duration: 800,
        easing: 'easeOutBack',
        delay: 600
      });

      // Character celebration
      if (characterRef.current) {
        // Big jump
        anime({
          targets: characterRef.current,
          translateY: [0, -120, 0],
          rotateZ: [0, 15, -15, 0],
          duration: 1200,
          easing: 'easeInOutQuad'
        });

        // Confetti explosion
        const createConfetti = () => {
          for (let i = 0; i < 50; i++) {
            const dot = document.createElement('div');
            dot.className = 'absolute w-2.5 h-2.5 rounded-full';
            dot.style.backgroundColor = `hsl(${Math.random() * 60 + 120}, 80%, 60%)`;
            dot.style.left = `${50 + (Math.random() - 0.5) * 30}%`;
            dot.style.top = '50%';
            characterRef.current?.appendChild(dot);

            anime({
              targets: dot,
              translateY: [0, anime.random(-200, -400)],
              translateX: [0, anime.random(-200, 200)],
              opacity: [1, 0],
              scale: [1, anime.random(1.5, 2.5)],
              duration: 1800,
              easing: 'easeOutQuad',
              complete: () => dot.remove()
            });
          }
        };

        createConfetti();
        setTimeout(createConfetti, 300);
        setTimeout(createConfetti, 600);
      }

    } catch (error) {
      console.error("Email sending failed:", error);
      // Optionally, send an error response or show a message to the user
      
      // Error animation
      anime({
        targets: formRef.current,
        translateX: [0, 20, -20, 10, -10, 0],
        backgroundColor: ['rgba(255,255,255,0.1)', 'rgba(239, 68, 68, 0.2)'],
        duration: 1000,
        easing: 'easeInOutQuad'
      });

      // Reset button state
      anime({
        targets: ['.submit-btn .btn-text', '.submit-btn .loading-dots'],
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 300,
        easing: 'easeOutQuad'
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitSuccess(false);
    
    anime({
      targets: successRef.current,
      opacity: [1, 0],
      translateY: [0, 80],
      duration: 600,
      easing: 'easeInQuad'
    });

    anime({
      targets: formRef.current,
      opacity: [0, 1],
      translateY: [-100, 0],
      duration: 800,
      easing: 'easeOutBack',
      delay: 300
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/webp_image/tree.webp"
          alt="Tree background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Animated character */}
      <div 
        ref={characterRef}
        className="fixed bottom-8 right-8 z-20 w-48 h-48 md:w-64 md:h-64"
      >
        <div className="relative w-full h-full px-4 hidden lg:block">
          <Image
            src="/image/this_way.png"
            alt="Contact character"
            fill
            className="object-contain"
          />
          <div className="character-eyes absolute top-1/3 left-1/4 w-1/2 h-4 origin-center"></div>
          <div className="character-hand absolute top-1/2 right-1/4 w-1/4 h-1/4 origin-bottom"></div>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern bg-cover"></div>
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-5 flex justify-between items-center backdrop-blur-lg z-50 bg-black/30">
        <a href='../' className="text-white text-xl font-semibold hover:text-green-400 transition-colors">
          MyProfile
        </a>
        <div className="flex gap-5">
          {['home', 'about', 'portfolio', 'contact'].map((item) => (
            <Link 
              key={item}
              href={`/${item === 'home' ? '' : item}`}
              className={`text-white hover:text-green-400 transition-colors ${
                item === 'contact' ? 'text-green-400 font-medium' : ''
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white text-center">
          Let's <span className="text-green-400">Connect</span>
        </h1>
        <p className="text-lg text-center text-white/80 mb-8">
          Have a project in mind? Send me a message!
        </p>

        {!submitSuccess ? (
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/20 shadow-lg"
            noValidate
          >
            <div className="space-y-6">
              <div className="form-input opacity-0">
                <label htmlFor="name" className="block text-white/80 mb-2 transition-colors">Name</label>
                <input
                  ref={(el) => { inputRefs.current[0] = el }}
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-input opacity-0">
                <label htmlFor="email" className="block text-white/80 mb-2 transition-colors">Email</label>
                <input
                  ref={(el) => { inputRefs.current[1] = el }}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-input opacity-0">
                <label htmlFor="message" className="block text-white/80 mb-2 transition-colors">Message</label>
                <textarea
                  ref={(el) => { inputRefs.current[2] = el }}
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none transition-all"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>

              <div className="pt-4 form-input opacity-0">
                <button
                  type="submit"
                  className="submit-btn relative w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-green-500/30 overflow-hidden"
                  disabled={isSubmitting}
                >
                  <span className="btn-text block transition-all">Send Message</span>
                  <span className="loading-dots absolute inset-0 flex items-center justify-center opacity-0">
                    <span className="dot mx-1 w-2.5 h-2.5 bg-white rounded-full animate-bounce"></span>
                    <span className="dot mx-1 w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="dot mx-1 w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div 
            ref={successRef}
            className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-green-400/30 text-center opacity-0"
          >
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
              <div className="absolute inset-2 bg-green-400 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">Message Sent Successfully!</h2>
            
            <div className="mb-6 text-left bg-black/20 p-5 rounded-lg border border-white/10">
              <h3 className="text-lg font-medium text-green-300 mb-3">Your message details:</h3>
              <div className="space-y-2">
                <p className="text-white/90">
                  <span className="text-green-400 font-medium">Name:</span> {submittedData.name}
                </p>
                <p className="text-white/90">
                  <span className="text-green-400 font-medium">Email:</span> {submittedData.email}
                </p>
                <p className="text-white/90">
                  <span className="text-green-400 font-medium">Message:</span> {submittedData.message}
                </p>
              </div>
            </div>
            
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors hover:border-green-400 hover:text-green-400"
            >
              Send Another Message
            </button>
          </div>
        )}

        {/* Social links */}
        <div className="mt-12 flex justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/andy-tong-24a443213/"
            target="_blank"
            rel="noopener noreferrer"
            className={`social-icon w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:border-green-400 hover:bg-green-400/20 transition-all ${
              submitSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            onMouseEnter={(e) => {
              anime({
                targets: e.currentTarget,
                translateY: -8,
                scale: 1.15,
                duration: 300,
                easing: 'easeOutBack'
              });
            }}
            onMouseLeave={(e) => {
              anime({
                targets: e.currentTarget,
                translateY: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
              });
            }}
          >
            <span className="text-white text-xl">
              <FontAwesomeIcon icon={faLinkedin} /> 
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}