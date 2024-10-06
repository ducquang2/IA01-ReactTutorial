import React from 'react';

import { Square } from './Square';

import { BOARD_SIZE } from '../lib/constants';
import { calculateWinner } from '../lib/helper';

export { Board };

const boardSize = BOARD_SIZE;

type BoardProps = {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[], location: { row: number, col: number }) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const [status, setStatus] = React.useState('');

  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    const row = Math.floor(i / 3);
    const col = i % 3;
    onPlay(nextSquares, { row, col });
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.winningLine : null;

  React.useEffect(() => {
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (squares.every(Boolean)) {
      setStatus('Draw');
    } else {
      setStatus(`Next player: ${xIsNext ? 'X' : 'O'}`);
    }
  }, [squares, xIsNext]);

  return (
    <>
      <div className="status">{status}</div>
      {Array.from({ length: boardSize }).map((_, i) => {
        return (
          <div className="board-row" key={i}>
            {Array.from({ length: boardSize }).map((_, j) => {
              const index = i * boardSize + j;
              const isWinningSquare = !!(winningLine && winningLine.includes(index));
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                  isHighlighted={isWinningSquare}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}