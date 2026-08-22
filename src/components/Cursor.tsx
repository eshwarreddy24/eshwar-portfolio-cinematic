import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const move = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
    };

    const enterLink = () => {
      gsap.to(ring, { scale: 2, borderColor: 'rgba(255,215,0,0.6)', duration: 0.3 });
      gsap.to(dot, { scale: 0.5, duration: 0.3 });
    };
    const leaveLink = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(255,215,0,0.3)', duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', enterLink);
      el.addEventListener('mouseleave', leaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed',
        top: 0, left: 0,
        width: 6, height: 6,
        borderRadius: '50%',
        background: '#ffd700',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'difference',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed',
        top: 0, left: 0,
        width: 36, height: 36,
        borderRadius: '50%',
        border: '1.5px solid rgba(255,215,0,0.3)',
        pointerEvents: 'none',
        zIndex: 9998,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.3s, height 0.3s',
      }} />
    </>
  );
}
