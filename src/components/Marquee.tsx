const solidSkills = ['SAP MM', 'Procurement', 'AutoCAD', 'SketchUp', 'Content Creation', 'Cinematography', 'Client Coordination', 'Tender Scrutiny', 'Graphic Design', 'Video Editing'];
const outlineSkills = ['After Effects', 'Photoshop', 'MS Office Suite', 'ChatGPT', 'Claude Code', 'Vibe Coding', 'Figma', 'Canva', 'Premiere Pro', 'SAP S/4HANA'];

function Row({ items, dir }: { items: string[]; dir: 'left' | 'right' }) {
  const rep = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee-row">
      <div className={`marquee-track marquee-track--${dir}`}>
        {rep.map((s, i) => (
          <span key={i} className="marquee-item">
            <span className={dir === 'left' ? 'marquee-solid' : 'marquee-outline'}>{s}</span>
            <span className="marquee-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" id="about">
      <Row items={solidSkills} dir="left" />
      <Row items={outlineSkills} dir="right" />
    </div>
  );
}
