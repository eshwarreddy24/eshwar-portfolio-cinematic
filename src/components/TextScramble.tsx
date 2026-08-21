import { useEffect, useRef } from "react";

interface Props {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  className?: string;
  delay?: number;
}

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Hollywood decode effect — characters scramble then resolve to final text
const TextScramble = ({ text, tag: Tag = "span", className = "", delay = 0 }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          scramble(el, text, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, delay]);

  const scramble = (el: HTMLElement, finalText: string, delayMs: number) => {
    const totalFrames = finalText.length * 2;
    let frame = 0;

    setTimeout(() => {
      const interval = setInterval(() => {
        const progress = frame / totalFrames;
        let result = "";

        for (let i = 0; i < finalText.length; i++) {
          if (i < finalText.length * progress) {
            result += finalText[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        el.textContent = result;
        frame++;

        if (frame > totalFrames) {
          el.textContent = finalText;
          clearInterval(interval);
        }
      }, 30);
    }, delayMs);
  };

  return <Tag ref={ref as any} className={`text-scramble ${className}`}>{text}</Tag>;
};

export default TextScramble;
