import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../components/styles/DomeGallery.css';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { title: 'SAP MM', desc: 'Procurement & Billing', color: '#a78bfa', emoji: '🏢' },
  { title: 'Interior Design', desc: 'NRI Client Projects', color: '#fbbf24', emoji: '🎨' },
  { title: 'AutoCAD', desc: 'Architectural Drafts', color: '#22d3ee', emoji: '📐' },
  { title: 'Video Editing', desc: 'Premiere Pro & AE', color: '#f472b6', emoji: '🎬' },
  { title: 'Python', desc: 'AI & Automation', color: '#34d399', emoji: '🐍' },
  { title: 'Graphic Design', desc: 'Photoshop & Illustrator', color: '#fb923c', emoji: '✏️' },
  { title: 'Procurement', desc: 'GeM & Tender Scrutiny', color: '#a78bfa', emoji: '📋' },
  { title: 'Content Creation', desc: 'Memes & Social Media', color: '#fbbf24', emoji: '📱' },
  { title: 'Blender 3D', desc: '3D Modeling & Rendering', color: '#22d3ee', emoji: '🧊' },
];

export default function DomeGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelector('.dome-title'), {
      opacity: 0, y: 30,
    }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' },
    });
  }, []);

  const rotateDome = (direction: 'left' | 'right') => {
    const step = 360 / galleryItems.length;
    const newRotation = direction === 'right' ? rotation - step : rotation + step;
    setRotation(newRotation);
    const newIndex = direction === 'right'
      ? (activeIndex + 1) % galleryItems.length
      : (activeIndex - 1 + galleryItems.length) % galleryItems.length;
    setActiveIndex(newIndex);
  };

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      rotateDome('right');
    }, 4000);
    return () => clearInterval(interval);
  }, [rotation, activeIndex]);

  return (
    <section className="dome-gallery" ref={containerRef}>
      <div className="dome-container">
        <div className="section-header dome-title">
          <span className="section-tag">07</span>
          <h2 className="section-title">Skills Dome</h2>
          <div className="section-line" />
        </div>

        <div className="dome-viewport">
          {/* 3D Dome */}
          <div className="dome-sphere" style={{ transform: `rotateY(${rotation}deg)` }}>
            {galleryItems.map((item, i) => {
              const angle = (i / galleryItems.length) * 360;
              const isActive = i === activeIndex;
              return (
                <div
                  key={i}
                  className={`dome-card ${isActive ? 'active' : ''}`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(220px)`,
                    borderColor: isActive ? item.color : 'rgba(255,255,255,0.06)',
                  }}
                >
                  <span className="dome-emoji">{item.emoji}</span>
                  <h3 className="dome-card-title" style={{ color: item.color }}>{item.title}</h3>
                  <p className="dome-card-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <button className="dome-arrow dome-left" onClick={() => rotateDome('left')}>‹</button>
          <button className="dome-arrow dome-right" onClick={() => rotateDome('right')}>›</button>

          {/* Active info */}
          <div className="dome-info">
            <span className="dome-info-number" style={{ color: galleryItems[activeIndex].color }}>
              0{activeIndex + 1}
            </span>
            <span className="dome-info-total">/ 0{galleryItems.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}