import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiFigma,
  SiBlender,
  SiUnrealengine,
  SiAutocad,
  SiSketchup,
  SiPython,
  SiGithub,
  SiVercel,
  SiClickup,
} from 'react-icons/si';
import {
  BsRobot,
  BsChatDots,
  BsCodeSlash,
  BsTerminal,
  BsFileEarmarkImage,
  BsCameraReels,
  BsPalette2,
  BsWindowDesktop,
  BsFileSpreadsheet,
  BsFileWord,
  BsClipboardData,
} from 'react-icons/bs';
import '../components/styles/TechStackNew.css';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: 'Design & Creative',
    tools: [
      { name: 'Photoshop', icon: BsFileEarmarkImage },
      { name: 'Illustrator', icon: BsPalette2 },
      { name: 'Premiere Pro', icon: BsCameraReels },
      { name: 'After Effects', icon: BsWindowDesktop },
      { name: 'Canva', icon: BsWindowDesktop },
      { name: 'Figma', icon: SiFigma },
      { name: 'Blender', icon: SiBlender },
      { name: 'Unreal Engine', icon: SiUnrealengine },
    ],
  },
  {
    name: 'Engineering & Office',
    tools: [
      { name: 'AutoCAD', icon: SiAutocad },
      { name: 'SketchUp', icon: SiSketchup },
      { name: 'MS Excel', icon: BsFileSpreadsheet },
      { name: 'MS Word', icon: BsFileWord },
      { name: 'PowerPoint', icon: BsClipboardData },
      { name: 'SAP MM', icon: BsWindowDesktop },
    ],
  },
  {
    name: 'Tech & AI',
    tools: [
      { name: 'Python', icon: SiPython },
      { name: 'Claude Code', icon: BsTerminal },
      { name: 'ChatGPT', icon: BsChatDots },
      { name: 'Vibe Coding', icon: BsCodeSlash },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Vercel', icon: SiVercel },
      { name: 'ClickUp', icon: SiClickup },
      { name: 'Cursor', icon: BsRobot },
    ],
  },
];

export default function TechStackNew() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.tool-card');
    if (!cards) return;

    gsap.fromTo(cards, {
      opacity: 0,
      y: 30,
      scale: 0.9,
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
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

        {categories.map((cat, ci) => (
          <div className="tool-category" key={ci}>
            <h3 className="category-name">{cat.name}</h3>
            <div className="tool-grid">
              {cat.tools.map((tool, ti) => (
                <div className="tool-card" key={ti}>
                  <div className="tool-icon-wrapper">
                    <tool.icon className="tool-icon" size={28} />
                  </div>
                  <span className="tool-name">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}