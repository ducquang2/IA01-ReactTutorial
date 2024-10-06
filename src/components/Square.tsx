export { Square };

type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
  isHighlighted: boolean;
};

function Square({ value, onSquareClick, isHighlighted }: SquareProps) {
  console.log(value);

  return (
    <button className={`square ${isHighlighted ? 'highlight' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  )
}
