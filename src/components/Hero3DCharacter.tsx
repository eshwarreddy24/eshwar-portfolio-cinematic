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
  const [isWaving, setIsWaving] = useState(false);

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
      rotateY: mousePos.x * 12,
      rotateX: -mousePos.y * 12,
      x: mousePos.x * 15,
      y: mousePos.y * 8,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, [mousePos]);

  // Entrance animation + periodic wave
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current, {
      opacity: 0, scale: 0.6, filter: 'blur(20px)',
    }, {
      opacity: 1, scale: 1, filter: 'blur(0px)',
      duration: 2, delay: 0.5, ease: 'power3.out',
    });

    // Wave every 8 seconds
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000);
    }, 8000);

    // First wave after 3 seconds
    const firstWave = setTimeout(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000);
    }, 3000);

    return () => {
      clearInterval(waveInterval);
      clearTimeout(firstWave);
    };
  }, []);

  return (
    <div className="hero-3d-character" ref={containerRef}>
      {/* Scanning Rings */}
      <div className="ring ring-1" />
      <div className="ring ring-2" />
      <div className="ring ring-3" />

      {/* Main image with 3D perspective */}
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
            <div className="character-fallback"><span>ERG</span></div>
          )}
          <div className="character-scanline" />
          <div className="character-holo-overlay" />
        </div>
      </div>

      {/* Waving hand */}
      <div className={`wave-hand ${isWaving ? 'waving' : ''}`}>
        <span>👋</span>
      </div>

      {/* Hi speech bubble */}
      <div className={`hi-bubble ${isWaving ? 'show' : ''}`}>
        <span>Hi! I'm Eshwar 👋</span>
      </div>

      {/* HUD panels */}
      <div className="character-hud hud-tl">
        <span className="hud-label">ID</span>
        <span className="hud-value">ERG-001</span>
      </div>
      <div className="character-hud hud-tr">
        <span className="hud-label">STATUS</span>
        <span className="hud-value" style={{ color: '#4ade80' }}>● ACTIVE</span>
      </div>
      <div className="character-hud hud-bl">
        <span className="hud-label">LOCATION</span>
        <span className="hud-value">BENGALURU</span>
      </div>
      <div className="character-hud hud-br">
        <span className="hud-label">CLEARANCE</span>
        <span className="hud-value" style={{ color: '#fbbf24' }}>LEVEL A</span>
      </div>

      {/* Energy particles */}
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="char-particle" style={{
          '--angle': `${(i / 16) * 360}deg`,
          '--delay': `${i * 0.25}s`,
          '--distance': `${90 + Math.random() * 30}px`,
          '--size': `${2 + Math.random() * 2}px`,
        } as React.CSSProperties} />
      ))}
    </div>
  );
}