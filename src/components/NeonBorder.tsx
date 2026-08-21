import { type ReactNode } from "react";
import "./styles/NeonBorder.css";

interface Props {
  children: ReactNode;
  className?: string;
  color?: string;
  speed?: number;
}

// Electric neon border with flowing energy
const NeonBorder = ({ children, className = "", color = "#00e676", speed = 3 }: Props) => {
  return (
    <div
      className={`neon-border-wrapper ${className}`}
      style={{
        "--neon-color": color,
        "--neon-speed": `${speed}s`,
      } as React.CSSProperties}
    >
      <div className="neon-border-glow" />
      <div className="neon-border-content">
        {children}
      </div>
    </div>
  );
};

export default NeonBorder;
