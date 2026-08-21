import { useRef, useEffect, useState, useCallback } from 'react';
import '../components/styles/MiniGame.css';

export default function MiniGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const gameRef = useRef<{
    animId: number;
    player: { x: number; y: number; size: number };
    obstacles: { x: number; y: number; w: number; h: number; speed: number; scored?: boolean }[];
    frame: number;
    score: number;
    running: boolean;
  } | null>(null);

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = 400;
    canvas.height = 200;

    const player = { x: 50, y: 150, size: 20 };
    const obstacles: { x: number; y: number; w: number; h: number; speed: number; scored?: boolean }[] = [];
    let frame = 0;
    let currentScore = 0;
    let running = true;

    gameRef.current = { animId: 0, player, obstacles, frame: 0, score: 0, running: true };
    setIsPlaying(true);
    setScore(0);

    const jump = () => { player.y = 120; };
    canvas.onclick = jump;
    document.onkeydown = (e) => { if (e.code === 'Space') jump(); };

    const animate = () => {
      if (!running) return;
      ctx.fillStyle = '#08080f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      for (let i = 0; i < 20; i++) {
        ctx.fillStyle = `rgba(167, 139, 250, ${Math.random() * 0.5 + 0.2})`;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
      }

      // Player
      player.y += 1.5; // gravity
      if (player.y > 150) player.y = 150;
      ctx.fillStyle = '#a78bfa';
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.size / 2, 0, Math.PI * 2);
      ctx.fill();
      // Glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#a78bfa';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Obstacles
      frame++;
      if (frame % 60 === 0) {
        const h = 20 + Math.random() * 40;
        obstacles.push({ x: canvas.width, y: 170 - h, w: 15, h, speed: 2 + currentScore * 0.1 });
      }

      for (let i = obstacles.length - 1; i >= 0; i--) {
        const ob = obstacles[i];
        ob.x -= ob.speed;

        // Draw obstacle
        ctx.fillStyle = '#ef4444';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ef4444';
        ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
        ctx.shadowBlur = 0;

        // Collision
        if (
          player.x + 10 > ob.x && player.x - 10 < ob.x + ob.w &&
          player.y + 10 > ob.y && player.y - 10 < ob.y + ob.h
        ) {
          running = false;
          setIsPlaying(false);
          if (currentScore > highScore) setHighScore(currentScore);
          return;
        }

        // Score
        if (ob.x + ob.w < player.x && !ob.scored) {
          ob.scored = true;
          currentScore++;
          setScore(currentScore);
        }

        // Remove offscreen
        if (ob.x < -20) obstacles.splice(i, 1);
      }

      // Ground line
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.3)';
      ctx.beginPath();
      ctx.moveTo(0, 170);
      ctx.lineTo(canvas.width, 170);
      ctx.stroke();

      // Score display
      ctx.fillStyle = '#f1f5f9';
      ctx.font = '14px Inter, sans-serif';
      ctx.fillText(`Score: ${currentScore}`, 10, 25);

      if (gameRef.current) gameRef.current.animId = requestAnimationFrame(animate);
    };
    animate();
  }, [highScore]);

  useEffect(() => {
    return () => {
      if (gameRef.current) cancelAnimationFrame(gameRef.current.animId);
    };
  }, []);

  return (
    <section className="minigame-section">
      <div className="minigame-container">
        <div className="section-header">
          <span className="section-tag">🎮</span>
          <h2 className="section-title">Play a Game</h2>
          <div className="section-line" />
        </div>
        <p className="minigame-desc">
          Space Dodge — Press <strong>Space</strong> or <strong>Click</strong> to jump over obstacles!
        </p>
        <div className="minigame-box">
          {!showGame ? (
            <button className="play-btn" onClick={() => { setShowGame(true); setTimeout(startGame, 100); }}>
              ▶ START GAME
            </button>
          ) : (
            <>
              <canvas ref={canvasRef} className="game-canvas" />
              <div className="game-controls">
                <span className="game-score">Score: {score}</span>
                <span className="game-high">Best: {highScore}</span>
                {!isPlaying && (
                  <button className="restart-btn" onClick={startGame}>
                    ↻ RETRY
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}