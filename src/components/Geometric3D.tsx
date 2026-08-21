import "./styles/Geometric3D.css";

// Rotating wireframe icosahedron — lightweight CSS 3D animation
const Geometric3D = () => {
  return (
    <div className="character-container">
      <div className="character-model character-loaded">
        <div className="geo3d-scene">
          <div className="geo3d-cube">
            <div className="geo3d-face geo3d-front" />
            <div className="geo3d-face geo3d-back" />
            <div className="geo3d-face geo3d-left" />
            <div className="geo3d-face geo3d-right" />
            <div className="geo3d-face geo3d-top" />
            <div className="geo3d-face geo3d-bottom" />
          </div>
          <div className="geo3d-ring geo3d-ring-1" />
          <div className="geo3d-ring geo3d-ring-2" />
          <div className="geo3d-ring geo3d-ring-3" />
          <div className="geo3d-glow" />
        </div>
      </div>
    </div>
  );
};

export default Geometric3D;
