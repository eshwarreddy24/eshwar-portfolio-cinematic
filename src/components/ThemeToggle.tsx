import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'white';

const themes: { key: Theme; icon: string; label: string }[] = [
  { key: 'light', icon: '☀️', label: 'Light' },
  { key: 'dark', icon: '🌙', label: 'Dark' },
  { key: 'white', icon: '◻️', label: 'White' },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved && themes.some(t => t.key === saved)) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const change = (t: Theme) => {
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  };

  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Theme toggle">
      {themes.map(t => (
        <button
          key={t.key}
          className={`theme-btn${theme === t.key ? ' active' : ''}`}
          onClick={() => change(t.key)}
          role="radio"
          aria-checked={theme === t.key}
          aria-label={t.label}
          title={t.label}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}
