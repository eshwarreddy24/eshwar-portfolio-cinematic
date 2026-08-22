const solidSkills = [
  'SAP MM', 'Procurement', 'Interior Design', 'AutoCAD', 'SketchUp',
  'Content Creation', 'Cinematography', 'Client Coordination',
  'Tender Scrutiny', 'BOQ & Estimation',
];

const outlineSkills = [
  'Graphic Design', 'Video Editing', 'After Effects', 'Photoshop',
  'MS Office Suite', 'Python', 'ChatGPT', 'Claude Code',
  'Vibe Coding', 'GitHub', 'Figma', 'Canva',
];

function MarqueeRow({ items, direction }: { items: string[]; direction: 'left' | 'right' }) {
  // Duplicate items 4x for seamless loop
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className={`marquee-row marquee-row--${direction}`}>
      {repeated.map((skill, i) => (
        <span key={i} className="marquee-item">
          <span className={direction === 'left' ? 'marquee-solid' : 'marquee-outline'}>
            {skill}
          </span>
          <span className="marquee-sep">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee-wrap" id="about">
      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
          background: 'linear-gradient(to right, #0a0a0a, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
          background: 'linear-gradient(to left, #0a0a0a, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <MarqueeRow items={solidSkills} direction="left" />
        <MarqueeRow items={outlineSkills} direction="right" />
      </div>
    </div>
  );
}
