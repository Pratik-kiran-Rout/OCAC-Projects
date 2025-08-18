import React, { useEffect, useMemo, useState } from 'react';
import './TicTacToe.css';

// Helper to calculate winner from current board state
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Heuristic evaluation for non-terminal boards (positive favors O, negative favors X)
function evaluateBoard(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  let score = 0;
  for (const [a, b, c] of lines) {
    const trio = [board[a], board[b], board[c]];
    const oCount = trio.filter(v => v === 'O').length;
    const xCount = trio.filter(v => v === 'X').length;
    if (oCount > 0 && xCount > 0) continue; // blocked line
    if (oCount > 0 && xCount === 0) {
      // Prefer two-in-a-row more than one
      score += oCount === 2 ? 3 : 1;
    } else if (xCount > 0 && oCount === 0) {
      score -= xCount === 2 ? 3 : 1;
    }
  }
  // Slight preference for center and corners if available to O
  if (board[4] === 'O') score += 0.5;
  if ([0, 2, 6, 8].some(i => board[i] === 'O')) score += 0.25;
  if (board[4] === 'X') score -= 0.5;
  if ([0, 2, 6, 8].some(i => board[i] === 'X')) score -= 0.25;
  return score;
}

// Depth-limited minimax with memoization (O plays vs X)
function minimaxLimited(board, isONext, cache, depth) {
  const key = board.join('') + (isONext ? 'O' : 'X') + ':' + depth;
  if (cache.has(key)) return cache.get(key);

  const winner = calculateWinner(board);
  if (winner === 'O') return { score: 10 };
  if (winner === 'X') return { score: -10 };
  if (board.every((c) => c !== null)) return { score: 0 }; // draw
  if (depth === 0) return { score: evaluateBoard(board) };

  const moves = [];
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const next = board.slice();
      next[i] = isONext ? 'O' : 'X';
      const result = minimaxLimited(next, !isONext, cache, depth - 1);
      moves.push({ index: i, score: result.score });
    }
  }

  // Break ties randomly among equally good moves
  if (isONext) {
    const maxScore = Math.max(...moves.map(m => m.score));
    const bestMoves = moves.filter(m => m.score === maxScore);
    const choice = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    cache.set(key, choice);
    return choice;
  } else {
    const minScore = Math.min(...moves.map(m => m.score));
    const bestMoves = moves.filter(m => m.score === minScore);
    const choice = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    cache.set(key, choice);
    return choice;
  }
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Human is X, PC is O

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((s) => s !== null);

  // Compute empty indices once per state
  const emptyIndices = useMemo(() => squares.map((v, i) => (v ? null : i)).filter((x) => x !== null), [squares]);

  function handleHumanMove(index) {
    if (!isXNext || squares[index] || winner) return;
    const next = squares.slice();
    next[index] = 'X';
    setSquares(next);
    setIsXNext(false);
  }

  // Let the PC (O) move after human move
  useEffect(() => {
    if (winner || isDraw) return;
    if (!isXNext) {
      const t = setTimeout(() => {
        const cache = new Map();
        // Full-depth search: depth equals remaining empty cells
        const best = minimaxLimited(squares, true, cache, emptyIndices.length);
        const idx = best?.index ?? emptyIndices[0];
        if (idx !== undefined) {
          const next = squares.slice();
          next[idx] = 'O';
          setSquares(next);
        }
        setIsXNext(true);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [isXNext, winner, isDraw, squares, emptyIndices]);

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Draw!';
  } else {
    status = `Next: ${isXNext ? 'You (X)' : 'Computer (O)'}`;
  }

  return (
    <div className="ttt-container">
      <h2>Tic Tac Toe</h2>
      <div className="status">{status}</div>

      <div className="board">
        {squares.map((value, idx) => (
          <button
            key={idx}
            className="square"
            onClick={() => handleHumanMove(idx)}
            disabled={!!value || !!winner || !isXNext}
            aria-label={`cell-${idx}`}
          >
            {value}
          </button>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
}