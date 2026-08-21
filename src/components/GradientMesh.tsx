import { useEffect, useRef } from "react";

interface GradientMeshProps {
  colors?: string[];
  speed?: number;
}

// Flowing animated gradient mesh — creates organic, living backgrounds
const GradientMesh = ({ colors = ["#00e676", "#006633", "#003318", "#0a0a0a"], speed = 0.002 }: GradientMeshProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth / 3; // Low res for perf
      canvas.height = window.innerHeight / 3;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Blob {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
    }

    const blobs: Blob[] = colors.map((color) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 80 + Math.random() * 120,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      color,
    }));

    const draw = () => {
      time += speed;
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob) => {
        blob.x += Math.sin(time + blob.vy * 10) * 0.8;
        blob.y += Math.cos(time + blob.vx * 10) * 0.8;

        // Wrap
        if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius;
        if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius;
        if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius;

        const grad = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        grad.addColorStop(0, blob.color + "30");
        grad.addColorStop(0.5, blob.color + "10");
        grad.addColorStop(1, blob.color + "00");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        borderRadius: "inherit",
        imageRendering: "auto",
        filter: "blur(60px)",
        opacity: 0.6,
      }}
    />
  );
};

export default GradientMesh;