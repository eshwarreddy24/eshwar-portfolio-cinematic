import { useEffect, useRef, useState } from "react";

interface Props {
  imageSrc?: string;
  initials: string;
}

// 3D Character that follows mouse cursor — black suit, muscular, professional
const MouseFollower3D = ({ imageSrc, initials }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize to -1 to 1
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = (clientY / innerHeight) * 2 - 1;

      // Character follows with smooth interpolation
      setPosition({
        x: normalizedX * 30,
        y: normalizedY * 20,
      });

      // Subtle rotation based on mouse position
      setRotation({
        x: normalizedY * -15,
        y: normalizedX * 15,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="mouse-follower-3d"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      <div className="character-body">
        {/* Head with face */}
        <div className="character-head">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Eshwar Reddy Gali"
              className="character-face"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.classList.add("show-initials");
              }}
            />
          ) : null}
          <div className="character-initials">{initials}</div>
        </div>

        {/* Neck */}
        <div className="character-neck" />

        {/* Torso - Black Suit */}
        <div className="character-torso">
          <div className="suit-collar" />
          <div className="suit-button" />
          <div className="suit-button" />
        </div>

        {/* Arms */}
        <div className="character-arm arm-left" />
        <div className="character-arm arm-right" />

        {/* Desk */}
        <div className="character-desk">
          <div className="laptop-screen">
            <div className="screen-glow" />
            <div className="code-lines">
              <div className="code-line" />
              <div className="code-line short" />
              <div className="code-line medium" />
              <div className="code-line" />
              <div className="code-line short" />
            </div>
          </div>
          <div className="laptop-base" />
        </div>
      </div>

      {/* Ambient glow */}
      <div className="character-glow" />

      {/* Floating particles */}
      <div className="character-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MouseFollower3D;
