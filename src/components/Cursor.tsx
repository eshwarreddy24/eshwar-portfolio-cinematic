import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current!;
    const trail = trailRef.current!;
    const glow = glowRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    const trailPos = { x: 0, y: 0 };
    let hover = false;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const loop = () => {
      if (!hover) {
        cursorPos.x += (mousePos.x - cursorPos.x) / 6;
        cursorPos.y += (mousePos.y - cursorPos.y) / 6;
        trailPos.x += (mousePos.x - trailPos.x) / 12;
        trailPos.y += (mousePos.y - trailPos.y) / 12;

        gsap.set(cursor, { x: cursorPos.x, y: cursorPos.y });
        gsap.set(trail, { x: trailPos.x, y: trailPos.y });
        gsap.set(glow, { x: mousePos.x, y: mousePos.y });
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    document.addEventListener("mousemove", onMouseMove);

    // Magnetic pull on interactive elements
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;

      element.addEventListener("mouseenter", (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.15 });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
        // Magnetic pull effect
        gsap.to(glow, {
          scale: 2.5,
          opacity: 0.15,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
        gsap.to(glow, {
          scale: 1,
          opacity: 0.06,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div className="cursor-main" ref={cursorRef}></div>
      <div className="cursor-trail" ref={trailRef}></div>
      <div className="cursor-glow" ref={glowRef}></div>
    </>
  );
};

export default Cursor;
