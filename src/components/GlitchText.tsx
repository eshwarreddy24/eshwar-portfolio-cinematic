import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

// Cyberpunk glitch text — randomly displaces characters with RGB split
const GlitchText = ({ children, className = "" }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let interval: ReturnType<typeof setInterval>;

    const glitch = () => {
      if (Math.random() > 0.92) {
        el.classList.add("glitch-active");
        setTimeout(() => el.classList.remove("glitch-active"), 150);
      }
    };

    interval = setInterval(glitch, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span ref={ref} className={`glitch-text ${className}`} data-text={children as string}>
      {children}
    </span>
  );
};

export default GlitchText;