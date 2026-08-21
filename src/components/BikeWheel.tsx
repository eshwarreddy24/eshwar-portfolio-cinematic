import "./styles/BikeWheel.css";

// Lightweight CSS/SVG spinning bike wheel — replaces the old 3D character
const BikeWheel = () => {
  const spokes = Array.from({ length: 12 });

  return (
    <div className="character-container">
      <div className="character-model character-loaded">
        <div className="bike-wheel-wrap">
          <svg viewBox="0 0 300 300" className="bike-wheel-svg">
            <circle cx="150" cy="150" r="140" className="wheel-tire" />
            <circle cx="150" cy="150" r="112" className="wheel-rim" />
            <g className="wheel-spokes">
              {spokes.map((_, i) => (
                <line
                  key={i}
                  x1="150"
                  y1="150"
                  x2="150"
                  y2="38"
                  transform={`rotate(${(360 / spokes.length) * i} 150 150)`}
                />
              ))}
            </g>
            <circle cx="150" cy="150" r="22" className="wheel-hub" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BikeWheel;
