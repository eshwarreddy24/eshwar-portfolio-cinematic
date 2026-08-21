import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from './TiltCard';
import '../components/styles/SkillsSection.css';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Design & Creative',
    color: '#a78bfa',
    tools: [
      { name: 'Photoshop', icon: '🎨' },
      { name: 'Premiere Pro', icon: '🎬' },
      { name: 'Illustrator', icon: '✏️' },
      { name: 'After Effects', icon: '✨' },
      { name: 'Figma', icon: '🖌️' },
      { name: 'Blender', icon: '🧊' },
      { name: 'Unreal Engine', icon: '🎮' },
      { name: 'Canva', icon: '📐' },
    ],
  },
  {
    title: 'Engineering & Office',
    color: '#fbbf24',
    tools: [
      { name: 'AutoCAD', icon: '🏗️' },
      { name: 'SketchUp', icon: '🏠' },
      { name: 'SAP MM', icon: '🏢' },
      { name: 'MS Excel', icon: '📊' },
      { name: 'MS Word', icon: '📝' },
      { name: 'PowerPoint', icon: '📽️' },
    ],
  },
  {
    title: 'Tech & AI',
    color: '#22d3ee',
    tools: [
      { name: 'Python', icon: '🐍' },
      { name: 'Claude Code', icon: '🤖' },
      { name: 'ChatGPT', icon: '💬' },
      { name: 'GitHub', icon: '🐙' },
      { name: 'Vercel', icon: '▲' },
      { name: 'Cursor', icon: '⚡' },
      { name: 'ClickUp', icon: '📋' },
      { name: 'Vibe Coding', icon: '🎵' },
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.skill-block');
    gsap.fromTo(cards, {
      opacity: 0, y: 30, scale: 0.95,
    }, {
      opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.04,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
    });
  }, [activeTab]);

  return (
    <section className="skills-section" id="tools" ref={sectionRef}>
      <div className="skills-container">
        <div className="section-header">
          <span className="section-tag">04</span>
          <h2 className="section-title">Skills & Tools</h2>
          <div className="section-line" />
        </div>

        {/* Tab Switcher */}
        <div className="skills-tabs">
          {skillCategories.map((cat, i) => (
            <button
              key={i}
              className={`skills-tab ${activeTab === i ? 'active' : ''}`}
              style={{ '--tab-color': cat.color } as React.CSSProperties}
              onClick={() => setActiveTab(i)}
            >
              <span className="tab-dot" style={{ background: cat.color }} />
              {cat.title}
            </button>
          ))}
        </div>

        {/* 3D Skill Blocks Grid */}
        <div className="skills-grid">
          {skillCategories[activeTab].tools.map((tool, i) => (
            <TiltCard key={`${activeTab}-${i}`} className="skill-block-wrapper">
              <div className="skill-block" style={{ '--block-color': skillCategories[activeTab].color } as React.CSSProperties}>
                <div className="skill-icon-big">{tool.icon}</div>
                <span className="skill-name">{tool.name}</span>
                <div className="skill-glow" />
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Skill Count */}
        <div className="skills-count">
          <span style={{ color: skillCategories[activeTab].color }}>
            {skillCategories[activeTab].tools.length}
          </span> tools in {skillCategories[activeTab].title}
        </div>
      </div>
    </section>
  );
}