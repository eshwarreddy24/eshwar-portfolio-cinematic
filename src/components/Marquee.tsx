const row1 = [
  'SAP MM', 'Procurement', 'Microsoft 365', 'Advanced Excel',
  'SharePoint', 'e-Office', 'GeM Portal', 'MIS Reporting',
  'Executive Operations', 'Corporate Governance',
];

const row2 = [
  'Graphic Design', 'After Effects', 'Premiere Pro',
  'Content Creation', 'Cinematography', 'Figma', 'Canva',
  'Video Editing', 'SketchUp', 'GitHub',
];

function MarqueeRow({ items, direction }: { items: string[]; direction: 'left' | 'right' }) {
  const content = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee-row">
      <div className={`marquee-track marquee-track--${direction === 'left' ? 'left' : 'right'}`}>
        {content.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className={i % 2 === 0 ? 'marquee-solid' : 'marquee-outline'}>{item}</span>
            <span className="marquee-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="marquee">
      <MarqueeRow items={row1} direction="left" />
      <MarqueeRow items={row2} direction="right" />
    </section>
  );
}
