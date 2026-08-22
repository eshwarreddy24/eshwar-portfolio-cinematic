import { useState, useEffect, useCallback, useRef } from 'react';

type Cell = { id: number; active: boolean };

export default function SpeedGame() {
  const [grid, setGrid] = useState<Cell[]>([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [playing, setPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('');
  const timerRef = useRef<number | null>(null);
  const spawnRef = useRef<number | null>(null);

  const gridSize = 16;

  const spawnTarget = useCallback(() => {
    setGrid(prev => {
      const empty = prev.filter(c => !c.active);
      if (empty.length === 0) return prev;
      const pick = empty[Math.floor(Math.random() * empty.length)];
      return prev.map(c => c.id === pick.id ? { ...c, active: true } : c);
    });
  }, []);

  const startGame = useCallback(() => {
    const cells = Array.from({ length: gridSize }, (_, i) => ({ id: i, active: false }));
    setGrid(cells);
    setScore(0);
    setMissed(0);
    setTimeLeft(30);
    setPlaying(true);
    setMessage('');
  }, []);

  useEffect(() => {
    if (!playing) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const spawnInterval = () => {
      spawnTarget();
      spawnRef.current = window.setTimeout(spawnInterval, 800 + Math.random() * 600);
    };
    spawnRef.current = window.setTimeout(spawnInterval, 500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (spawnRef.current) clearTimeout(spawnRef.current);
    };
  }, [playing, spawnTarget]);

  useEffect(() => {
    if (!playing) {
      if (score > highScore) setHighScore(score);
      if (score > 15) setMessage('🔥 Lightning fast!');
      else if (score > 10) setMessage('⚡ Great reflexes!');
      else if (score > 5) setMessage('👍 Not bad!');
      else if (score > 0) setMessage('Keep practicing!');
    }
  }, [playing, score, highScore]);

  function hitCell(id: number) {
    if (!playing) return;
    const cell = grid.find(c => c.id === id);
    if (!cell || !cell.active) {
      setMissed(m => m + 1);
      return;
    }
    setScore(s => s + 1);
    setGrid(prev => prev.map(c => c.id === id ? { ...c, active: false } : c));
  }

  return (
    <section className="cricket-section" id="cricket">
      <div className="cricket-wrap">
        <p className="stack-eyebrow"><span>⚡</span> Speed Game</p>
        <h2 className="stack-h2">Test Your <em className="about-serif about-green">Reflexes</em></h2>

        {/* Scoreboard */}
        <div className="cricket-scoreboard">
          <div className="cricket-score-item">
            <span className="cricket-score-label">Score</span>
            <span className="cricket-score-num">{score}</span>
          </div>
          <div className="cricket-score-divider">|</div>
          <div className="cricket-score-item">
            <span className="cricket-score-label">Missed</span>
            <span className="cricket-score-num">{missed}</span>
          </div>
          <div className="cricket-score-divider">|</div>
          <div className="cricket-score-item">
            <span className="cricket-score-label">Time</span>
            <span className="cricket-score-num">{timeLeft}s</span>
          </div>
          <div className="cricket-score-divider">|</div>
          <div className="cricket-score-item">
            <span className="cricket-score-label">Best</span>
            <span className="cricket-score-num">{highScore}</span>
          </div>
        </div>

        {/* Game Grid */}
        <div className="speed-grid">
          {grid.map(cell => (
            <button
              key={cell.id}
              className={`speed-cell ${cell.active ? 'speed-cell-active' : ''}`}
              onClick={() => hitCell(cell.id)}
            />
          ))}
        </div>

        {/* Controls */}
        {!playing ? (
          <div className="speed-controls">
            <button className="chess-reset" onClick={startGame}>
              {score > 0 ? 'Play Again' : 'Start Game'}
            </button>
            {message && <p className="speed-message">{message}</p>}
          </div>
        ) : (
          <p className="speed-instruction">Tap the green cells! ⬜→🟩</p>
        )}
      </div>
    </section>
  );
}
