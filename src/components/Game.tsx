import { useState, useEffect, useCallback, useRef } from 'react';

const WORDS = [
  'SAP', 'PROCUREMENT', 'EXCEL', 'OPERATIONS', 'GOVERNANCE',
  'COMPLIANCE', 'AUTOMATION', 'ANALYTICS', 'STRATEGY', 'LEADERSHIP',
  'INNOVATION', 'EFFICIENCY', 'DATABASE', 'REPORTING', 'DIGITAL',
  'MANAGEMENT', 'LOGISTICS', 'PLANNING', 'AUDIT', 'SECURITY',
];

type GameState = 'idle' | 'playing' | 'over';

export default function Game() {
  const [state, setState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try { return parseInt(localStorage.getItem('eshwar-game-best') || '0'); } catch { return 0; }
  });
  const [currentWord, setCurrentWord] = useState('');
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [missed, setMissed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const nextWord = useCallback(() => {
    setCurrentWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setInput('');
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
    setInput('');
    setState('playing');
    nextWord();
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [nextWord]);

  // Countdown
  useEffect(() => {
    if (state !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setState('over');
          setBest(prev => {
            const newBest = Math.max(prev, score);
            try { localStorage.setItem('eshwar-game-best', String(newBest)); } catch {}
            return newBest;
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [state, score]);

  const handleInput = (val: string) => {
    setInput(val);
    if (val.toUpperCase() === currentWord) {
      const points = 10 + streak * 2;
      setScore(s => s + points);
      setStreak(s => s + 1);
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 300);
      nextWord();
    }
  };

  return (
    <div className="game-section">
      <div className="game-wrap">
        <p className="about-eyebrow"><span>🎮</span> Play a Game</p>
        <h2 className="about-h2" style={{ marginBottom: 8 }}>
          Word <span className="about-serif green-glow">Racer</span>
        </h2>
        <p style={{ color: 'var(--ink-3)', fontSize: 14, marginBottom: 32 }}>
          Type the falling word before time runs out. Streaks earn bonus points!
        </p>

        {state === 'idle' && (
          <button className="game-start-btn" onClick={startGame}>
            Start Game <span style={{ fontSize: 18 }}>⌨️</span>
          </button>
        )}

        {state === 'playing' && (
          <div className="game-active">
            <div className="game-hud">
              <div className="game-hud-item">
                <span className="game-hud-label">Score</span>
                <span className="game-hud-num" style={{ color: showFlash ? 'var(--accent)' : undefined }}>
                  {score}
                </span>
              </div>
              <div className="game-hud-item">
                <span className="game-hud-label">Time</span>
                <span className="game-hud-num" style={{ color: timeLeft <= 10 ? '#ff4444' : undefined }}>
                  {timeLeft}s
                </span>
              </div>
              <div className="game-hud-item">
                <span className="game-hud-label">Streak</span>
                <span className="game-hud-num" style={{ color: streak >= 5 ? 'var(--accent)' : undefined }}>
                  {streak}🔥
                </span>
              </div>
            </div>

            <div className={`game-word-display ${missed ? 'missed' : ''} ${showFlash ? 'hit' : ''}`}>
              {currentWord}
            </div>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              className="game-input"
              placeholder="type here..."
              autoComplete="off"
              spellCheck={false}
            />

            <div className="game-hint">
              {currentWord.split('').map((ch, i) => (
                <span
                  key={i}
                  style={{
                    color: i < input.length
                      ? input[i].toUpperCase() === ch ? 'var(--accent)' : '#ff4444'
                      : 'var(--ink-3)',
                    transition: 'color .15s',
                  }}
                >
                  {ch}
                </span>
              ))}
            </div>
          </div>
        )}

        {state === 'over' && (
          <div className="game-over">
            <div className="game-over-score">{score}</div>
            <div className="game-over-label">points</div>
            {score >= best && score > 0 && <div className="game-over-best">🏆 New Best!</div>}
            <div style={{ color: 'var(--ink-3)', fontSize: 14, marginBottom: 20 }}>
              Best: {Math.max(best, score)}
            </div>
            <button className="game-start-btn" onClick={startGame}>
              Play Again <span style={{ fontSize: 18 }}>🔄</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
