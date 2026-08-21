import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
}

const ScrollReveal = ({ children, direction = "up", delay = 0 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const transforms: Record<string, string> = {
      up: "translateY(40px)",
      left: "translateX(-40px)",
      right: "translateX(40px)",
      scale: "scale(0.95)",
    };

    el.style.opacity = "0";
    el.style.transform = transforms[direction];
    el.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay]);

  return <div ref={ref}>{children}</div>;
};

export default ScrollReveal;
