import { useEffect, useRef } from "react";

const ScanLines = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frame = 0;
    const resize = () => { canvas.width = window.innerWidth / 2; canvas.height = window.innerHeight / 2; };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      frame++;
      if (frame % 2 !== 0) { animId = requestAnimationFrame(draw); return; }
      const w = canvas.width; const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const noise = Math.random() * 20 - 10;
          const scanLine = (y % 3 === 0) ? -3 : 0;
          data[i] = 128 + noise + scanLine;
          data[i + 1] = 128 + noise + scanLine;
          data[i + 2] = 128 + noise + scanLine;
          data[i + 3] = 5;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        zIndex: 9998, pointerEvents: "none", opacity: 0.35, mixBlendMode: "overlay",
      }} />
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        zIndex: 9997, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 45%, rgba(10,5,5,0.6) 100%)",
      }} />
    </>
  );
};

export default ScanLines;
