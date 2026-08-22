import { useEffect, useRef } from 'react';

interface TunnelIntroProps {
  progress: number;
}

export default function TunnelIntro({ progress }: TunnelIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Tunnel lines radiating from center
      const numLines = 24;
      const maxRadius = Math.max(w, h) * 0.8;
      const tunnelDepth = progress * 20;

      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        const innerR = 20 + tunnelDepth * 5;
        const outerR = maxRadius;

        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
        ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
        ctx.strokeStyle = `rgba(20, 20, 20, ${0.06 + progress * 0.04})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Concentric rings
      const numRings = 8;
      for (let i = 0; i < numRings; i++) {
        const r = (30 + i * 60 + tunnelDepth * 20) % maxRadius;
        const opacity = Math.max(0, 0.08 - (i / numRings) * 0.06);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(20, 20, 20, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Center glow
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      gradient.addColorStop(0, `rgba(255, 46, 15, ${0.03 * progress})`);
      gradient.addColorStop(1, 'rgba(255, 46, 15, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    };

    draw();
  }, [progress]);

  return <canvas ref={canvasRef} className="tunnel-canvas" />;
}
