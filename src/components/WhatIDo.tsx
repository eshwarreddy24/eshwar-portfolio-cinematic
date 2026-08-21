import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BsPalette, BsFileEarmarkText } from 'react-icons/bs';
import '../components/styles/WhatIDo.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: BsPalette,
    title: 'Design & Drafting',
    desc: 'Interior design concepts, architectural drawings, AutoCAD drafts, and creative presentations for premium clients.',
  },
  {
    icon: BsFileEarmarkText,
    title: 'Documentation & Estimation',
    desc: 'BOQ preparation, billing, tender documentation, procurement scrutiny, and commercial analysis for enterprise operations.',
  },
];

export default function WhatIDo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.service-card');
    if (!cards) return;

    gsap.fromTo(cards, {
      opacity: 0,
      y: 40,
      filter: 'blur(5px)',
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <section className="whatido" id="work" ref={sectionRef}>
      <div className="whatido-container">
        <div className="section-header">
          <span className="section-tag">02</span>
          <h2 className="section-title">What I Do</h2>
          <div className="section-line" />
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="service-icon-wrapper">
                <s.icon className="service-icon" size={24} />
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}