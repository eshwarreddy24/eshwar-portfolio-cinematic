import { useEffect, useRef } from "react";

// Cinematic volumetric light rays that sweep across the hero
const LightRays = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Ray {
      x: number;
      angle: number;
      width: number;
      speed: number;
      opacity: number;
      color: string;
    }

    const rays: Ray[] = [];
    for (let i = 0; i < 6; i++) {
      rays.push({
        x: Math.random() * canvas.width,
        angle: -30 + Math.random() * 60,
        width: 40 + Math.random() * 120,
        speed: 0.1 + Math.random() * 0.3,
        opacity: 0.015 + Math.random() * 0.025,
        color: `rgba(0, ${200 + Math.random() * 55}, ${80 + Math.random() * 80}, `,
      });
    }

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rays.forEach((ray) => {
        const xPos = (Math.sin(time * ray.speed) * 0.5 + 0.5) * canvas.width;

        ctx.save();
        ctx.translate(xPos, -50);
        ctx.rotate((ray.angle * Math.PI) / 180);

        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.5);
        grad.addColorStop(0, ray.color + (ray.opacity * 2) + ")");
        grad.addColorStop(0.3, ray.color + ray.opacity + ")");
        grad.addColorStop(0.7, ray.color + (ray.opacity * 0.5) + ")");
        grad.addColorStop(1, ray.color + "0)");

        ctx.fillStyle = grad;
        ctx.fillRect(-ray.width / 2, 0, ray.width, canvas.height * 1.5);
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.6,
        mixBlendMode: "screen",
      }}
    />
  );
};

export default LightRays;
