import { useState, useCallback } from 'react';

type Piece = { type: string; color: 'w' | 'b' };
type Board = (Piece | null)[][];

const INIT: Board = [
  [{type:'r',color:'b'},{type:'n',color:'b'},{type:'b',color:'b'},{type:'q',color:'b'},{type:'k',color:'b'},{type:'b',color:'b'},{type:'n',color:'b'},{type:'r',color:'b'}],
  Array(8).fill(null).map(()=>({type:'p',color:'b'})),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null).map(()=>({type:'p',color:'w'})),
  [{type:'r',color:'w'},{type:'n',color:'w'},{type:'b',color:'w'},{type:'q',color:'w'},{type:'k',color:'w'},{type:'b',color:'w'},{type:'n',color:'w'},{type:'r',color:'w'}],
];

const PIECES: Record<string,string> = {
  'wk':'♔','wq':'♕','wr':'♖','wb':'♗','wn':'♘','wp':'♙',
  'bk':'♚','bq':'♛','br':'♜','bb':'♝','bn':'♞','bp':'♟',
};

export default function ChessGame() {
  const [board, setBoard] = useState<Board>(INIT);
  const [sel, setSel] = useState<{r:number;c:number}|null>(null);
  const [turn, setTurn] = useState<'w'|'b'>('w');

  const handleClick = useCallback((r: number, c: number) => {
    if (!sel) {
      const p = board[r][c];
      if (p && p.color === turn) setSel({ r, c });
      return;
    }
    if (sel.r === r && sel.c === c) { setSel(null); return; }
    const piece = board[sel.r][sel.c];
    const target = board[r][c];
    if (piece && target && target.color === piece.color) { setSel({ r, c }); return; }

    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = piece;
    newBoard[sel.r][sel.c] = null;
    setBoard(newBoard);
    setSel(null);
    setTurn(t => t === 'w' ? 'b' : 'w');
  }, [sel, board, turn]);

  return (
    <section className="chess-section" id="chess">
      <div className="chess-wrap">
        <p className="stack-eyebrow"><span>✦</span> Play Chess</p>
        <h2 className="stack-h2">Let's <em className="about-serif about-green">Play</em></h2>
        <p style={{ color: 'var(--ink-2)', marginTop: 8, fontSize: 14 }}>
          {turn === 'w' ? "Your turn (White)" : "Black's turn"}
        </p>
        <div className="chess-board">
          {board.map((row, r) => (
            <div key={r} className="chess-row">
              {row.map((cell, c) => {
                const isSel = sel?.r === r && sel?.c === c;
                const isDark = (r + c) % 2 === 1;
                return (
                  <button
                    key={c}
                    className={`chess-cell ${isDark ? 'chess-dark' : 'chess-light'} ${isSel ? 'chess-sel' : ''}`}
                    onClick={() => handleClick(r, c)}
                  >
                    {cell ? PIECES[cell.color + cell.type] : ''}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <button className="chess-reset" onClick={() => { setBoard(INIT); setSel(null); setTurn('w'); }}>
          Reset Game
        </button>
      </div>
    </section>
  );
}
