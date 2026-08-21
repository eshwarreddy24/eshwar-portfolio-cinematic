import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import SocialIcons from './SocialIcons';
import '../components/styles/Contact.css';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: FiMail, label: 'eshwarreddy.gali@outlook.com', href: 'mailto:eshwarreddy.gali@outlook.com' },
  { icon: FiPhone, label: '+91 9515291117', href: 'tel:+919515291117' },
  { icon: FiMapPin, label: 'Bengaluru, Karnataka, India', href: '#' },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.contact-item'), {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact-container">
        <div className="section-header">
          <span className="section-tag">06</span>
          <h2 className="section-title">Contact</h2>
          <div className="section-line" />
        </div>
        <div className="contact-grid">
          {contactInfo.map((c, i) => (
            <a href={c.href} className="contact-item" key={i}>
              <c.icon size={18} />
              <span>{c.label}</span>
            </a>
          ))}
        </div>
        <SocialIcons />
        <div className="footer">
          <span>Designed & Developed by Eshwar Reddy Gali</span>
        </div>
      </div>
    </section>
  );
}