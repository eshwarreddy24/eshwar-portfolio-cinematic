import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Hero3DCharacter from './Hero3DCharacter';
import '../components/styles/Landing.css';

const titles = [
  'ENGINEER',
  'SAP SPECIALIST',
  'PROCUREMENT SPECIALIST',
  'GRAPHIC DESIGNER',
  'CINEMATOGRAPHER',
  'CONTENT CREATOR',
  'MEME CREATOR',
];

export default function Landing() {
  const titleRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  // Cinematic entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Name appears with cinematic sweep
    tl.fromTo(nameRef.current, {
      opacity: 0,
      y: 40,
      filter: 'blur(10px)',
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'power3.out',
    });

    // Subtitle appears
    tl.fromTo(subtitleRef.current, {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    }, '-=0.8');

    return () => { tl.kill(); };
  }, []);

  // Rotating title animation
  useEffect(() => {
    let index = 0;
    const el = titleRef.current;
    if (!el) return;

    const rotate = () => {
      // Fade out
      gsap.to(el, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          index = (index + 1) % titles.length;
          el.textContent = titles[index];
          // Fade in
          gsap.fromTo(el, {
            opacity: 0,
            y: 15,
          }, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        },
      });
    };

    const interval = setInterval(rotate, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="landing" ref={heroRef}>
      {/* Cinematic vignette */}
      <div className="landing-vignette" />

      {/* Center content */}
      <div className="landing-center">
        {/* 3D Character */}
        <div className="landing-character">
          <Hero3DCharacter imageSrc="/profile.jpg" />
        </div>

        {/* Name */}
        <h1 className="landing-name" ref={nameRef}>
          ESHWAR REDDY GALI
        </h1>

        {/* Rotating titles */}
        <div className="landing-title-container">
          <span className="landing-title" ref={titleRef}>
            {titles[0]}
          </span>
        </div>

        {/* Subtitle */}
        <div className="landing-subtitle" ref={subtitleRef}>
          <div className="subtitle-line" />
          <span>BENGALURU, INDIA</span>
          <div className="subtitle-dot" />
          <span>OPEN TO OPPORTUNITIES</span>
          <div className="subtitle-line" />
        </div>

        {/* Scroll indicator */}
        <div className="landing-scroll-indicator">
          <div className="scroll-line" />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
}