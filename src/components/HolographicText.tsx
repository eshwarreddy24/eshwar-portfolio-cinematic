import { useEffect, useRef, type ReactNode } from "react";
import "./styles/HolographicText.css";

interface Props {
  children: ReactNode;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "span";
}

// MCU Holographic text — projected blue glow with flicker
const HolographicText = ({ children, className = "", tag: Tag = "span" }: Props) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let interval: ReturnType<typeof setInterval>;
    interval = setInterval(() => {
      if (Math.random() > 0.95) {
        el.style.opacity = "0.7";
        setTimeout(() => { el.style.opacity = "1"; }, 50 + Math.random() * 100);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <Tag ref={ref as any} className={`holo-text ${className}`}>
      {children}
    </Tag>
  );
};

export default HolographicText;
