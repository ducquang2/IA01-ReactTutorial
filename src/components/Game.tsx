import React from 'react';

import { Board } from './Board';

import { BOARD_SIZE } from '../lib/constants';

export { Game };

type History = {
  squares: string[];
  location: { row: number, col: number } | null;
}

function Game() {
  const [history, setHistory] = React.useState<History[]>([{ squares: Array(Math.pow(BOARD_SIZE, 2)).fill(null), location: null }]);
  const [isAscending, setIsAscending] = React.useState(true);
  const [currentMove, setCurrentMove] = React.useState(0);

  function jumpToPosition(nextMove: any) {
    setCurrentMove(nextMove);
  }

  function toggleSortOrder() {
    setIsAscending(!isAscending);
  }

  function handlePlay(nextSquares: any, location: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const sortedMoves = isAscending ? history.map((_, move) => move) : [...history.keys()].reverse();

  const moves = sortedMoves.map((move) => {
    const { location } = history[move];
    const row = location ? location.row : null;
    const col = location ? location.col : null;

    let description;
    if (move > 0) {
      description = `Go to move #${move} (${row}, ${col})`;
    } else {
      description = 'Go to game start';
    }

    if (move === currentMove) {
      return (
        <li key={move}>
          <span>You are at move #{move} ({row}, {col})</span>
        </li>
      );
    } else {
      return (
        <li key={move}>
          <button onClick={() => jumpToPosition(move)}>{description}</button>
        </li>
      );
    }
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={currentMove % 2 === 0} squares={history[currentMove].squares} onPlay={(nextSquares, location) => handlePlay(nextSquares, location)} />
      </div>
      <div className="history">
        <button onClick={toggleSortOrder}>
          {isAscending ? 'Sort Descending' : 'Sort Ascending'}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
