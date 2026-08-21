import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiFigma, SiBlender, SiUnrealengine, SiAutocad, SiSketchup,
  SiPython, SiGithub, SiVercel, SiClickup,
} from 'react-icons/si';
import {
  BsRobot, BsChatDots, BsCodeSlash, BsTerminal,
  BsFileEarmarkImage, BsCameraReels, BsPalette2, BsWindowDesktop,
  BsFileSpreadsheet,
} from 'react-icons/bs';
import '../components/styles/TechStackNew.css';

gsap.registerPlugin(ScrollTrigger);

const pyramidTiers = [
  {
    label: 'CORE',
    tools: [
      { name: 'Python', icon: SiPython, color: '#3776ab' },
      { name: 'SAP MM', icon: BsWindowDesktop, color: '#0070c0' },
      { name: 'AutoCAD', icon: SiAutocad, color: '#e32012' },
    ],
  },
  {
    label: 'DESIGN & CREATIVE',
    tools: [
      { name: 'Photoshop', icon: BsFileEarmarkImage, color: '#31a8ff' },
      { name: 'Premiere Pro', icon: BsCameraReels, color: '#9999ff' },
      { name: 'Illustrator', icon: BsPalette2, color: '#ff9a00' },
      { name: 'After Effects', icon: BsWindowDesktop, color: '#9999ff' },
    ],
  },
  {
    label: 'ENGINEERING & AI',
    tools: [
      { name: 'Figma', icon: SiFigma, color: '#a259ff' },
      { name: 'Blender', icon: SiBlender, color: '#ea7600' },
      { name: 'Unreal', icon: SiUnrealengine, color: '#0e639c' },
      { name: 'SketchUp', icon: SiSketchup, color: '#e8e5e1' },
      { name: 'MS Office', icon: BsFileSpreadsheet, color: '#217346' },
    ],
  },
  {
    label: 'TOOLS & AI',
    tools: [
      { name: 'Claude', icon: BsTerminal, color: '#d4a574' },
      { name: 'ChatGPT', icon: BsChatDots, color: '#10a37f' },
      { name: 'Vibe Coding', icon: BsCodeSlash, color: '#a78bfa' },
      { name: 'GitHub', icon: SiGithub, color: '#f0f0f0' },
      { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
      { name: 'ClickUp', icon: SiClickup, color: '#7b68ee' },
      { name: 'Cursor', icon: BsRobot, color: '#22d3ee' },
    ],
  },
];

export default function TechStackNew() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.tool-card');
    if (!cards) return;
    gsap.fromTo(cards, {
      opacity: 0, y: 30, scale: 0.9,
    }, {
      opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.03,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current, start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <section className="techstack" id="tools" ref={sectionRef}>
      <div className="techstack-container">
        <div className="section-header">
          <span className="section-tag">03</span>
          <h2 className="section-title">Tools & Software</h2>
          <div className="section-line" />
        </div>

        <div className="pyramid">
          {pyramidTiers.map((tier, ti) => (
            <div className="pyramid-tier" key={ti}>
              <span className="tier-label">{tier.label}</span>
              <div className="tier-items" style={{ '--cols': tier.tools.length } as React.CSSProperties}>
                {tier.tools.map((tool, j) => (
                  <div className="tool-card" key={j}>
                    <div className="tool-icon-wrapper" style={{ borderColor: tool.color + '30' }}>
                      <tool.icon size={26} style={{ color: tool.color }} />
                    </div>
                    <span className="tool-name">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}