import { useEffect, useRef } from "react";

const HolographicHUD = () => {
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

    interface HUDPanel { x: number; y: number; width: number; height: number; speed: number; text: string[]; type: "rect" | "circle" | "reticle"; opacity: number; phase: number; }
    const panels: HUDPanel[] = [
      { x: 0.05, y: 0.15, width: 120, height: 60, speed: 0.01, text: ["SYS:ONLINE", "PWR:98.7%", "NET:ACTIVE"], type: "rect", opacity: 0, phase: 0 },
      { x: 0.9, y: 0.2, width: 80, height: 80, speed: -0.008, text: [], type: "circle", opacity: 0, phase: 1 },
      { x: 0.08, y: 0.75, width: 140, height: 50, speed: 0.012, text: ["SCAN:100%", "TARG:LOCK"], type: "rect", opacity: 0, phase: 2 },
      { x: 0.85, y: 0.55, width: 60, height: 60, speed: -0.02, text: [], type: "reticle", opacity: 0, phase: 1.5 },
      { x: 0.12, y: 0.45, width: 90, height: 40, speed: 0.009, text: ["ARCH:v3.2"], type: "rect", opacity: 0, phase: 2.5 },
    ];

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scan line
      const scanY = ((time * 50) % canvas.height);
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrad.addColorStop(0, "rgba(255, 23, 68, 0)");
      scanGrad.addColorStop(0.5, "rgba(255, 23, 68, 0.03)");
      scanGrad.addColorStop(1, "rgba(255, 23, 68, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, canvas.width, 60);

      panels.forEach((panel) => {
        const px = panel.x * canvas.width;
        const py = panel.y * canvas.height;
        const fadeIn = Math.min(1, Math.max(0, (time - panel.phase) * 0.5));
        panel.opacity = fadeIn * 0.4;
        if (panel.opacity <= 0) return;
        ctx.save(); ctx.globalAlpha = panel.opacity;

        if (panel.type === "rect") {
          ctx.strokeStyle = "rgba(255, 23, 68, 0.5)"; ctx.lineWidth = 0.5;
          ctx.strokeRect(px, py, panel.width, panel.height);
          const b = 8; ctx.strokeStyle = "rgba(255, 80, 100, 0.8)"; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(px, py + b); ctx.lineTo(px, py); ctx.lineTo(px + b, py); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(px + panel.width - b, py); ctx.lineTo(px + panel.width, py); ctx.lineTo(px + panel.width, py + b); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(px, py + panel.height - b); ctx.lineTo(px, py + panel.height); ctx.lineTo(px + b, py + panel.height); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(px + panel.width - b, py + panel.height); ctx.lineTo(px + panel.width, py + panel.height); ctx.lineTo(px + panel.width, py + panel.height - b); ctx.stroke();
          ctx.font = "9px monospace"; ctx.fillStyle = "rgba(255, 100, 120, 0.7)";
          panel.text.forEach((line, i) => { ctx.fillText(line, px + 8, py + 16 + i * 14); });
        }
        if (panel.type === "circle") {
          const r = panel.width / 2; const rot = time * panel.speed * 10;
          ctx.beginPath(); ctx.arc(px + r, py + r, r, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 23, 68, 0.3)"; ctx.lineWidth = 0.5;
          ctx.setLineDash([4, 8]); ctx.stroke(); ctx.setLineDash([]);
          ctx.beginPath(); ctx.arc(px + r, py + r, r - 5, rot, rot + 1.5);
          ctx.strokeStyle = "rgba(255, 80, 100, 0.6)"; ctx.lineWidth = 1.5; ctx.stroke();
          for (let i = 0; i < 8; i++) {
            const a = (Math.PI * 2 / 8) * i + time * 0.3;
            ctx.beginPath(); ctx.arc(px + r + Math.cos(a) * (r - 15), py + r + Math.sin(a) * (r - 15), 1, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 100, 120, 0.5)"; ctx.fill();
          }
        }
        if (panel.type === "reticle") {
          const r = panel.width / 2; const rot = time * panel.speed * 8;
          ctx.strokeStyle = "rgba(255, 80, 100, 0.5)"; ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(px + r - 15, py + r); ctx.lineTo(px + r + 15, py + r); ctx.moveTo(px + r, py + r - 15); ctx.lineTo(px + r, py + r + 15); ctx.stroke();
          ctx.beginPath(); ctx.arc(px + r, py + r, r - 5, rot, rot + Math.PI * 1.5);
          ctx.strokeStyle = "rgba(255, 80, 100, 0.4)"; ctx.lineWidth = 1; ctx.stroke();
          ctx.beginPath(); ctx.arc(px + r, py + r, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 100, 120, 0.8)"; ctx.fill();
        }
        ctx.restore();
      });

      // Data streams
      for (let i = 0; i < 3; i++) {
        const y = canvas.height * (0.3 + i * 0.2);
        const streamLen = 60 + Math.sin(time + i) * 20;
        const streamX = (time * 30 + i * 200) % (canvas.width + streamLen) - streamLen;
        ctx.beginPath(); ctx.moveTo(streamX, y); ctx.lineTo(streamX + streamLen, y);
        const grad = ctx.createLinearGradient(streamX, y, streamX + streamLen, y);
        grad.addColorStop(0, "rgba(255, 23, 68, 0)");
        grad.addColorStop(0.5, "rgba(255, 23, 68, 0.15)");
        grad.addColorStop(1, "rgba(255, 23, 68, 0)");
        ctx.strokeStyle = grad; ctx.lineWidth = 0.5; ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      zIndex: 3, pointerEvents: "none", opacity: 0.7,
    }} />
  );
};

export default HolographicHUD;
