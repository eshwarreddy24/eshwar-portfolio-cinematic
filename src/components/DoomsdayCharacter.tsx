import { useEffect, useRef, useState } from "react";

interface Props {
  imageSrc?: string;
  initials: string;
}

// Doomsday 3D Character — black suit, muscular, follows mouse, accepts photo
const DoomsdayCharacter = ({ imageSrc, initials }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseRef.current = {
        x: ((clientX / innerWidth) * 2 - 1) * 40,
        y: ((clientY / innerHeight) * 2 - 1) * 25,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth interpolation
  useEffect(() => {
    const animate = () => {
      currentPos.current.x += (mouseRef.current.x - currentPos.current.x) * 0.05;
      currentPos.current.y += (mouseRef.current.y - currentPos.current.y) * 0.05;
      setPosition({ ...currentPos.current });
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  // Canvas rendering for 3D head
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const size = 300;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    const img = new Image();
    let imageLoaded = false;
    if (imageSrc) {
      img.crossOrigin = "anonymous";
      img.onload = () => { imageLoaded = true; };
      img.src = imageSrc;
    }

    interface Particle {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 70 + Math.random() * 50,
        speed: 0.002 + Math.random() * 0.006,
        size: Math.random() * 1.5 + 0.3,
        life: Math.random() * 200,
        maxLife: 150 + Math.random() * 200,
      });
    }

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, size, size);

      // Outer glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140);
      glow.addColorStop(0, "rgba(139, 0, 0, 0.08)");
      glow.addColorStop(0.5, "rgba(139, 0, 0, 0.03)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(cx, cy, 140, 0, Math.PI * 2); ctx.fill();

      // Scanning rings
      for (let i = 0; i < 2; i++) {
        const ringR = 85 + i * 20 + Math.sin(time * 2 + i) * 3;
        const rot = time * (0.3 + i * 0.15) * (i % 2 === 0 ? 1 : -1);
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
        ctx.beginPath(); ctx.arc(0, 0, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 0, 0, ${0.12 - i * 0.03})`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 6 + i * 3]); ctx.stroke(); ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(0, 0, ringR, 0, 1);
        ctx.strokeStyle = `rgba(200, 50, 50, ${0.3})`;
        ctx.lineWidth = 1.2; ctx.stroke();
        ctx.restore();
      }

      // Head circle with image or initials
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, 55, 0, Math.PI * 2); ctx.clip();

      if (imageLoaded) {
        ctx.drawImage(img, cx - 55, cy - 55, 110, 110);
        // Holographic overlay
        const overlay = ctx.createLinearGradient(cx - 55, cy - 55, cx + 55, cy + 55);
        overlay.addColorStop(0, `rgba(139, 0, 0, ${0.05 + Math.sin(time) * 0.02})`);
        overlay.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        overlay.addColorStop(1, `rgba(80, 0, 0, ${0.06})`);
        ctx.fillStyle = overlay;
        ctx.fillRect(cx - 55, cy - 55, 110, 110);
        // Scan line
        const scanY = cy + Math.sin(time * 2) * 45;
        ctx.fillStyle = `rgba(200, 50, 50, 0.12)`;
        ctx.fillRect(cx - 55, scanY - 0.5, 110, 1);
      } else {
        ctx.fillStyle = "#0a0a0f";
        ctx.fillRect(cx - 55, cy - 55, 110, 110);
        ctx.font = "bold 36px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#8b0000";
        ctx.fillText(initials, cx, cy);
      }
      ctx.restore();

      // Head border
      ctx.beginPath(); ctx.arc(cx, cy, 57, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(139, 0, 0, 0.4)";
      ctx.lineWidth = 1.5; ctx.stroke();

      // Outer glow ring
      ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139, 0, 0, ${0.08 + Math.sin(time * 2) * 0.04})`;
      ctx.lineWidth = 3; ctx.stroke();

      // Floating particles
      particles.forEach((p) => {
        p.angle += p.speed;
        p.life++;
        if (p.life >= p.maxLife) {
          p.angle = Math.random() * Math.PI * 2;
          p.life = 0;
          p.maxLife = 150 + Math.random() * 200;
          p.radius = 70 + Math.random() * 50;
        }
        const lifeRatio = p.life / p.maxLife;
        let alpha = 0;
        if (lifeRatio < 0.1) alpha = lifeRatio / 0.1;
        else if (lifeRatio > 0.8) alpha = (1 - lifeRatio) / 0.2;
        else alpha = 1;

        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius;
        ctx.save();
        ctx.globalAlpha = alpha * 0.4;
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(139, 0, 0, 0.3)";
        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 50, 50, ${alpha})`;
        ctx.fill();
        ctx.restore();
      });

      // HUD data
      ctx.font = "7px monospace";
      ctx.fillStyle = "rgba(200, 50, 50, 0.25)";
      ctx.fillText("ID: ERG-" + Math.floor(time * 10) % 999, cx - 45, cy - 68);
      ctx.fillText("STATUS: ACTIVE", cx + 5, cy - 68);
      ctx.fillText("BENGALURU, IN", cx - 35, cy + 72);

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [imageSrc, initials]);

  return (
    <div
      ref={containerRef}
      className="doomsday-character"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) perspective(800px) rotateY(${position.x * 0.1}deg) rotateX(${-position.y * 0.1}deg)`,
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />

      {/* Body silhouette */}
      <div className="character-body-silhouette">
        <div className="body-neck" />
        <div className="body-torso">
          <div className="suit-collar" />
          <div className="suit-detail" />
          <div className="suit-detail" />
          <div className="suit-detail" />
        </div>
        <div className="body-arm arm-l" />
        <div className="body-arm arm-r" />
        <div className="body-desk">
          <div className="desk-laptop">
            <div className="laptop-screen">
              <div className="code-line" /><div className="code-line s" /><div className="code-line m" />
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="character-ambient" />
    </div>
  );
};

export default DoomsdayCharacter;
