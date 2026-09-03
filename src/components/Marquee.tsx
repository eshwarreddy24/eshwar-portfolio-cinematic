const row1 = [
  'SAP MM', 'Procurement', 'Vendor Management', 'SAP Certified',
  'Microsoft 365', 'Advanced Excel', 'e-Office', 'GeM Portal',
  'MIS Reporting', 'ClickUp', 'Stakeholder Management', 'SAP MM',
];

const row2 = [
  'Executive Operations', 'Risk Mitigation', 'SharePoint', 'MS Word',
  'MS PowerPoint', 'MS Excel', 'Data Analysis', 'Procurement',
  'Corporate Governance', 'Business Analysis', 'Operations', 'Executive Operations',
];

function Track({ items, dir }: { items: string[]; dir: 'left' | 'right' }) {
  const cls = dir === 'left' ? 'mq-track mq-left' : 'mq-track mq-right';
  return (
    <div className="mq-row" aria-hidden="true">
      <div className={cls}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="mq-item">
            <span className="mq-text">{t}</span>
            <span className="mq-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="mq" role="presentation">
      <Track items={row1} dir="left" />
      <Track items={row2} dir="right" />
    </div>
  );
}
