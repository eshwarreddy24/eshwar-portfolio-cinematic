import { useState } from 'react';

type Role = null | 'bat' | 'bowl';
type Phase = 'choose-role' | 'choose-action' | 'result';

const SHOTS = ['Drive', 'Pull', 'Sweep', 'Cut', 'Defend', 'Slog'];
const DELIVERIES = ['Fast', 'Spin', 'Yorker', 'Bouncer', 'Slower', 'Outswing'];

function rand(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function battingResult(shot: string, delivery: string): { runs: number; text: string; emoji: string } {
  const combo = shot + delivery;
  // Good matchups = more runs
  const good: Record<string, { runs: number; text: string; emoji: string }[]> = {
    'Drive': [{ runs: 4, text: 'Beautiful cover drive! Boundary!', emoji: '🏏' }, { runs: 6, text: 'Straight drive for SIX!', emoji: '💥' }],
    'Pull': [{ runs: 4, text: 'Pull shot to deep midwicket boundary!', emoji: '🏏' }, { runs: 6, text: 'Huge pull for SIX over deep square leg!', emoji: '💥' }],
    'Sweep': [{ runs: 4, text: 'Sweep shot races to fine leg boundary!', emoji: '🏏' }, { runs: 6, text: 'Monster sweep over deep midwicket for SIX!', emoji: '💥' }],
    'Cut': [{ runs: 4, text: 'Square cut races past point for four!', emoji: '🏏' }, { runs: 2, text: 'Late cut, picks up two runs.', emoji: '🏃' }],
    'Defend': [{ runs: 0, text: 'Solid defensive block. Good technique.', emoji: '🛡️' }, { runs: 1, text: 'Defensive push, quick single taken.', emoji: '🏃' }],
    'Slog': [{ runs: 6, text: 'MASSIVE SIX! Over long on!', emoji: '💥' }, { runs: 0, text: 'Slogged and caught at deep midwicket!', emoji: '😑' }],
  };
  const outcomes = good[shot] || [{ runs: 1, text: 'Nudged off the pads for a single.', emoji: '🏃' }];
  // Delivery affects probability
  const badMatchups = ['SlogOutswing', 'SlogBouncer', 'DriveYorker', 'SweepBouncer', 'CutYorker'];
  if (badMatchups.includes(combo)) {
    return { runs: rand(0, 1) === 0 ? 0 : 1, text: combo.includes('Slog') ? 'Edges it! Lucky to survive!' : 'Good delivery, no run!', emoji: '😑' };
  }
  return outcomes[rand(0, outcomes.length - 1)];
}

function bowlingResult(delivery: string, shot: string): { runs: number; text: string; emoji: string } {
  const goodBowls = ['Yorker', 'Bouncer', 'Outswing'];
  const goodShots = ['Drive', 'Slog', 'Pull'];
  const isGoodBowl = goodBowls.includes(delivery);
  const isGoodShot = goodShots.includes(shot);

  if (delivery === 'Yorker' && shot === 'Sweep') return { runs: 0, text: 'BEAT THE BAT! Yorker nips under the sweep! LBW appeal!', emoji: '🔥' };
  if (delivery === 'Bouncer' && shot === 'Defend') return { runs: 0, text: 'Bouncer ducks under it. Good leave.', emoji: '😎' };
  if (delivery === 'Outswing' && shot === 'Drive') return { runs: 0, text: 'Edges it! Caught behind! OUT!', emoji: '🔥' };
  if (delivery === 'Spin' && shot === 'Sweep') return { runs: 4, text: 'Batter sweeps spin for four!', emoji: '🏏' };
  if (isGoodBowl && !isGoodShot) return { runs: 0, text: 'Dot ball! Great bowling!', emoji: '🔥' };
  if (isGoodBowl && isGoodShot) return { runs: rand(1, 4), text: 'Good battle! Picks up runs.', emoji: '🏃' };
  return { runs: rand(0, 6), text: `${delivery} ball, ${shot} for ${rand(0, 6)} runs.`, emoji: rand(0, 6) > 3 ? '🏏' : '🏃' };
}

export default function CricketGame() {
  const [role, setRole] = useState<Role>(null);
  const [phase, setPhase] = useState<Phase>('choose-role');
  const [playerScore, setPlayerScore] = useState(0);
  const [comScore, setComScore] = useState(0);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);
  const [innings, setInnings] = useState(1); // 1 = player innings, 2 = computer innings
  const [result, setResult] = useState({ runs: 0, text: '', emoji: '' });
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  const maxOvers = 5;
  const maxBalls = maxOvers * 6;

  const totalOvers = Math.floor(balls / 6);
  const totalBalls = balls % 6;

  function handleRole(r: 'bat' | 'bowl') {
    setRole(r);
    setPhase('choose-action');
  }

  function handleAction(action: string) {
    if (innings === 1) {
      // Player batting (if role=bat) or player bowling (if role=bowl)
      const res = role === 'bat'
        ? battingResult(action, DELIVERIES[rand(0, 5)])
        : bowlingResult(action, SHOTS[rand(0, 5)]);

      const newPlayerScore = playerScore + res.runs;
      setPlayerScore(newPlayerScore);
      setResult(res);
      setShowResult(true);

      const newBalls = balls + 1;
      setBalls(newBalls);

      // Wicket check (only when batting, 15% chance)
      const isOut = role === 'bat' && res.runs === 0 && rand(1, 100) <= 15;
      if (isOut || newBalls >= maxBalls) {
        setTimeout(() => {
          setInnings(2);
          setBalls(0);
          setOvers(0);
          setShowResult(false);
          setResult({ runs: 0, text: innings === 1 && isOut ? 'OUT! All out! Now you bowl!' : 'Innings complete! Now you bowl!', emoji: '🏏' });
        }, 1500);
        return;
      }

      setTimeout(() => setShowResult(false), 1200);
    } else {
      // Computer batting, player bowling
      const res = bowlingResult(action, SHOTS[rand(0, 5)]);
      const newComScore = comScore + res.runs;
      setComScore(newComScore);
      setResult(res);
      setShowResult(true);

      const newBalls = balls + 1;
      setBalls(newBalls);

      const isOut = role === 'bowl' && res.runs === 0 && rand(1, 100) <= 15;
      if (isOut || newComScore > playerScore || newBalls >= maxBalls) {
        setTimeout(() => {
          setGameOver(true);
          const w = newComScore > playerScore ? (role === 'bat' ? 'Computer' : 'You') : (role === 'bat' ? 'You' : 'Computer');
          setWinner(w + ' win' + (w === 'You' ? '' : 's') + '!');
        }, 1500);
        return;
      }

      setTimeout(() => setShowResult(false), 1200);
    }
  }

  function resetGame() {
    setRole(null);
    setPhase('choose-role');
    setPlayerScore(0);
    setComScore(0);
    setOvers(0);
    setBalls(0);
    setInnings(1);
    setResult({ runs: 0, text: '', emoji: '' });
    setShowResult(false);
    setGameOver(false);
    setWinner('');
  }

  const actions = role === 'bat' ? SHOTS : DELIVERIES;

  return (
    <section className="cricket-section" id="cricket">
      <div className="cricket-wrap">
        <p className="stack-eyebrow"><span>🏏</span> Cricket</p>
        <h2 className="stack-h2">Let's <em className="about-serif about-green">Play</em></h2>

        {/* Scoreboard */}
        <div className="cricket-scoreboard">
          <div className="cricket-score-item">
            <span className="cricket-score-label">You {role === 'bat' ? '(Bat)' : '(Bowl)'}</span>
            <span className="cricket-score-num">{playerScore}</span>
          </div>
          <div className="cricket-score-divider">vs</div>
          <div className="cricket-score-item">
            <span className="cricket-score-label">Computer {role === 'bat' ? '(Bowl)' : '(Bat)'}</span>
            <span className="cricket-score-num">{comScore}</span>
          </div>
          <div className="cricket-score-divider">|</div>
          <div className="cricket-score-item">
            <span className="cricket-score-label">Over</span>
            <span className="cricket-score-num">{totalOvers}.{totalBalls}</span>
          </div>
          <div className="cricket-score-item">
            <span className="cricket-score-label">Innings</span>
            <span className="cricket-score-num">{innings}/2</span>
          </div>
        </div>

        {/* Choose Role */}
        {phase === 'choose-role' && (
          <div className="cricket-choices">
            <button className="cricket-choice-btn" onClick={() => handleRole('bat')}>
              <span className="cricket-choice-icon">🏏</span>
              <span className="cricket-choice-text">I'll Bat</span>
              <span className="cricket-choice-sub">Score runs, computer bowls</span>
            </button>
            <button className="cricket-choice-btn" onClick={() => handleRole('bowl')}>
              <span className="cricket-choice-icon">🔥</span>
              <span className="cricket-choice-text">I'll Bowl</span>
              <span className="cricket-choice-sub">Take wickets, computer bats</span>
            </button>
          </div>
        )}

        {/* Action buttons */}
        {phase === 'choose-action' && !gameOver && (
          <>
            <p className="cricket-instruction">
              {innings === 1
                ? (role === 'bat' ? 'Choose your shot:' : 'Choose your delivery:')
                : (role === 'bat' ? 'Choose your delivery:' : 'Choose your shot:')}
            </p>
            <div className="cricket-actions">
              {actions.map(a => (
                <button key={a} className="cricket-action-btn" onClick={() => handleAction(a)}>{a}</button>
              ))}
            </div>
          </>
        )}

        {/* Result */}
        {showResult && (
          <div className="cricket-result">
            <span className="cricket-result-emoji">{result.emoji}</span>
            <span className="cricket-result-text">{result.text}</span>
            <span className="cricket-result-runs">+{result.runs}</span>
          </div>
        )}

        {/* Game Over */}
        {gameOver && (
          <div className="cricket-gameover">
            <h3 className="cricket-gameover-title">{winner}</h3>
            <p className="cricket-gameover-score">You: {playerScore} | Computer: {comScore}</p>
            <button className="chess-reset" onClick={resetGame}>Play Again</button>
          </div>
        )}
      </div>
    </section>
  );
}
