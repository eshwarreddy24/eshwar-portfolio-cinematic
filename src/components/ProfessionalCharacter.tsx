import { useEffect, useRef } from "react";

// Professional 3D character — clean, elegant, sitting at desk with laptop
const ProfessionalCharacter = ({ imageSrc, initials }: { imageSrc?: string; initials: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const size = 500;
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

    // Floating particles
    interface Particle { x: number; y: number; vx: number; vy: number; size: number; opacity: number; }
    const particles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * size, y: Math.random() * size,
        vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.3 + 0.05,
      });
    }

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, size, size);

      // Ambient glow
      const ambientGlow = ctx.createRadialGradient(cx, cy - 20, 0, cx, cy - 20, 200);
      ambientGlow.addColorStop(0, "rgba(99, 102, 241, 0.06)");
      ambientGlow.addColorStop(0.5, "rgba(99, 102, 241, 0.02)");
      ambientGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ambientGlow;
      ctx.beginPath(); ctx.arc(cx, cy - 20, 200, 0, Math.PI * 2); ctx.fill();

      // Desk surface
      ctx.fillStyle = "#111118";
      ctx.beginPath();
      ctx.ellipse(cx, cy + 80, 140, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(99, 102, 241, 0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Desk legs
      ctx.fillStyle = "#0d0d12";
      ctx.fillRect(cx - 100, cy + 80, 4, 60);
      ctx.fillRect(cx + 96, cy + 80, 4, 60);

      // Laptop base
      ctx.fillStyle = "#1a1a24";
      const laptopW = 80;
      const laptopH = 8;
      ctx.fillRect(cx - laptopW / 2, cy + 60, laptopW, laptopH);

      // Laptop screen
      const screenW = 70;
      const screenH = 50;
      const screenY = cy + 60 - screenH;
      ctx.fillStyle = "#111118";
      ctx.fillRect(cx - screenW / 2, screenY, screenW, screenH);

      // Screen content — subtle code lines
      ctx.fillStyle = "rgba(99, 102, 241, 0.15)";
      for (let i = 0; i < 6; i++) {
        const lineW = 20 + Math.random() * 30;
        const lineX = cx - screenW / 2 + 8;
        const lineY = screenY + 10 + i * 7;
        ctx.fillRect(lineX, lineY, lineW, 2);
      }

      // Screen glow
      const screenGlow = ctx.createRadialGradient(cx, screenY + screenH / 2, 0, cx, screenY + screenH / 2, 60);
      screenGlow.addColorStop(0, "rgba(99, 102, 241, 0.08)");
      screenGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = screenGlow;
      ctx.beginPath();
      ctx.arc(cx, screenY + screenH / 2, 60, 0, Math.PI * 2);
      ctx.fill();

      // Character body (simplified silhouette)
      ctx.fillStyle = "#1a1a24";

      // Torso
      ctx.beginPath();
      ctx.ellipse(cx, cy + 10, 30, 35, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.arc(cx, cy - 35, 22, 0, Math.PI * 2);
      ctx.fill();

      // Profile photo or initials
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy - 35, 20, 0, Math.PI * 2);
      ctx.clip();

      if (imageLoaded) {
        ctx.drawImage(img, cx - 20, cy - 55, 40, 40);
        // Subtle overlay
        ctx.fillStyle = "rgba(99, 102, 241, 0.05)";
        ctx.fillRect(cx - 20, cy - 55, 40, 40);
      } else {
        ctx.fillStyle = "#0f0f18";
        ctx.fillRect(cx - 20, cy - 55, 40, 40);
        ctx.font = "bold 16px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#6366f1";
        ctx.fillText(initials, cx, cy - 35);
      }
      ctx.restore();

      // Head border
      ctx.beginPath();
      ctx.arc(cx, cy - 35, 21, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(99, 102, 241, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Arms (typing pose)
      ctx.strokeStyle = "#1a1a24";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";

      // Left arm
      ctx.beginPath();
      ctx.moveTo(cx - 25, cy + 5);
      ctx.quadraticCurveTo(cx - 40, cy + 30, cx - 20, cy + 58);
      ctx.stroke();

      // Right arm
      ctx.beginPath();
      ctx.moveTo(cx + 25, cy + 5);
      ctx.quadraticCurveTo(cx + 40, cy + 30, cx + 20, cy + 58);
      ctx.stroke();

      // Subtle floating particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > size) p.vx *= -1;
        if (p.y < 0 || p.y > size) p.vy *= -1;

        const pulse = 0.5 + Math.sin(time * 2 + p.x * 0.01) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity * pulse})`;
        ctx.fill();
      });

      // Subtle floating ring
      ctx.beginPath();
      ctx.arc(cx, cy - 20, 100 + Math.sin(time) * 3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(99, 102, 241, ${0.03 + Math.sin(time * 2) * 0.01})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [imageSrc, initials]);

  return (
    <div style={{
      position: "relative",
      width: "min(40vh, 400px)",
      height: "min(40vh, 400px)",
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default ProfessionalCharacter;
