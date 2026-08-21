import { useEffect, useRef } from "react";

const EnergyPortal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    interface Spark { angle: number; radius: number; speed: number; size: number; life: number; maxLife: number; color: string; }
    const sparks: Spark[] = [];
    const PORTAL_RADIUS = 150;

    for (let i = 0; i < 200; i++) {
      sparks.push({
        angle: Math.random() * Math.PI * 2,
        radius: PORTAL_RADIUS + (Math.random() - 0.5) * 20,
        speed: 0.005 + Math.random() * 0.015,
        size: Math.random() * 2.5 + 0.3,
        life: Math.random() * 200,
        maxLife: 100 + Math.random() * 200,
        color: Math.random() > 0.3 ? "red" : "white",
      });
    }

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Portal glow
      const glow = ctx.createRadialGradient(cx, cy, PORTAL_RADIUS - 20, cx, cy, PORTAL_RADIUS + 40);
      glow.addColorStop(0, "rgba(255, 23, 68, 0)");
      glow.addColorStop(0.4, "rgba(255, 23, 68, 0.05)");
      glow.addColorStop(0.7, "rgba(255, 23, 68, 0.02)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(cx, cy, PORTAL_RADIUS + 40, 0, Math.PI * 2); ctx.fill();

      // Portal ring
      ctx.beginPath(); ctx.arc(cx, cy, PORTAL_RADIUS, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 23, 68, 0.15)"; ctx.lineWidth = 1; ctx.stroke();

      ctx.beginPath(); ctx.arc(cx, cy, PORTAL_RADIUS - 10, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 23, 68, 0.08)"; ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 8]); ctx.stroke(); ctx.setLineDash([]);

      // Sparks
      sparks.forEach((spark) => {
        spark.angle += spark.speed;
        spark.life++;
        if (spark.life >= spark.maxLife) {
          spark.angle = Math.random() * Math.PI * 2;
          spark.life = 0;
          spark.maxLife = 100 + Math.random() * 200;
          spark.radius = PORTAL_RADIUS + (Math.random() - 0.5) * 20;
        }
        const lifeRatio = spark.life / spark.maxLife;
        let alpha = 0;
        if (lifeRatio < 0.1) alpha = lifeRatio / 0.1;
        else if (lifeRatio > 0.8) alpha = (1 - lifeRatio) / 0.2;
        else alpha = 1;

        const x = cx + Math.cos(spark.angle) * spark.radius;
        const y = cy + Math.sin(spark.angle) * spark.radius;
        ctx.save(); ctx.globalAlpha = alpha * 0.6; ctx.shadowBlur = 8;

        if (spark.color === "red") {
          ctx.fillStyle = `rgba(255, 50, 70, ${alpha})`;
          ctx.shadowColor = "rgba(255, 23, 68, 0.5)";
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
        }
        ctx.beginPath(); ctx.arc(x, y, spark.size, 0, Math.PI * 2); ctx.fill();

        // Trail
        const trailLen = spark.speed * 30;
        const tx = cx + Math.cos(spark.angle - trailLen) * spark.radius;
        const ty = cy + Math.sin(spark.angle - trailLen) * spark.radius;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(tx, ty);
        ctx.strokeStyle = spark.color === "red" ? `rgba(255, 50, 70, ${alpha * 0.3})` : `rgba(255, 255, 255, ${alpha * 0.3})`;
        ctx.lineWidth = spark.size * 0.5; ctx.stroke();
        ctx.restore();
      });

      // Energy arcs
      for (let i = 0; i < 5; i++) {
        const a1 = time * 0.3 + (Math.PI * 2 / 5) * i;
        const a2 = a1 + 0.5 + Math.sin(time + i) * 0.3;
        const r = PORTAL_RADIUS + Math.sin(time * 2 + i) * 8;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a1) * r, cy + Math.sin(a1) * r);
        ctx.quadraticCurveTo(cx + Math.cos(a1 + 0.15) * (r + 30), cy + Math.sin(a1 + 0.15) * (r + 30), cx + Math.cos(a2) * r, cy + Math.sin(a2) * r);
        ctx.strokeStyle = `rgba(255, 50, 70, ${0.1 + Math.sin(time * 3 + i) * 0.05})`;
        ctx.lineWidth = 0.6; ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      zIndex: 1, pointerEvents: "none", opacity: 0.5,
    }} />
  );
};

export default EnergyPortal;
