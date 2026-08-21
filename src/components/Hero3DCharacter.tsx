import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import '../components/styles/Hero3DCharacter.css';

interface Props {
  imageSrc?: string;
}

export default function Hero3DCharacter({ imageSrc = '/profile.jpg' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Smooth 3D rotation following mouse
  useEffect(() => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotateY: mousePos.x * 15,
      rotateX: -mousePos.y * 15,
      x: mousePos.x * 20,
      y: mousePos.y * 10,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, [mousePos]);

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current, {
      opacity: 0,
      scale: 0.6,
      filter: 'blur(20px)',
    }, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 2,
      delay: 0.5,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div className="hero-3d-character" ref={containerRef}>
      {/* CSS Scanning Rings */}
      <div className="ring ring-1" />
      <div className="ring ring-2" />
      <div className="ring ring-3" />

      {/* Main image container with 3D perspective */}
      <div className="character-perspective" ref={imageRef}>
        <div className="character-image-wrapper">
          <img
            src={imageSrc}
            alt="Eshwar Reddy Gali"
            className="character-image"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
          {!imageLoaded && (
            <div className="character-fallback">
              <span>ERG</span>
            </div>
          )}
          <div className="character-scanline" />
          <div className="character-holo-overlay" />
        </div>
      </div>

      {/* Floating HUD data */}
      <div className="character-hud hud-top-left">
        <span className="hud-label">ID</span>
        <span className="hud-value">ERG-001</span>
      </div>
      <div className="character-hud hud-top-right">
        <span className="hud-label">STATUS</span>
        <span className="hud-value">● ACTIVE</span>
      </div>
      <div className="character-hud hud-bottom-left">
        <span className="hud-label">LOCATION</span>
        <span className="hud-value">BENGALURU</span>
      </div>
      <div className="character-hud hud-bottom-right">
        <span className="hud-label">CLEARANCE</span>
        <span className="hud-value">LEVEL A</span>
      </div>

      {/* CSS Energy Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="character-particle"
          style={{
            '--angle': `${(i / 20) * 360}deg`,
            '--delay': `${i * 0.2}s`,
            '--distance': `${80 + Math.random() * 40}px`,
            '--size': `${2 + Math.random() * 3}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}