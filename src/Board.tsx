import React from "react";


/** possible chars for move, including null for cells that no moves yet **/
export type MoveChar = "X" | "O" | null;


type CellProps = {
  /** value to display in cell **/
  value: string;

  /** Callback function to trigger when cell is clicked **/
  onClick: () => void;

  /** Indicate if cell should be clickable **/
  clickable: boolean;

  /** Indicate if cell should be highlighted **/
  highlighted: boolean;
}

function Cell({value, onClick, clickable, highlighted}: CellProps)  {
  const extraProps = clickable ? {onClick} : {};
  const fmtClass = highlighted ? 'board-cell-highlighted' : 'board-cell-normal';
  const extraClass = clickable ? ' board-cell-clickable': '';

  return (
    <button
      className={`board-cell ${fmtClass} ${extraClass}`}
      {...extraProps}
    >
      {value}
    </button>
  );
}


type BoardProps = {
  /** Array of played moves in row-major ordering.
   * For example, the following board:
   *
   *     X | O | O
   *       |   |
   *       |   | X
   *
   * would be represented as ['X', 'O', 'O', null, null, null, null, null, 'X']
   * **/
  moves: MoveChar[];

  /** Callback function when a specific square on the board is clicked **/
  onClick: (idx: number) => void;

  /** Indicates if this is a read-only board **/
  readOnly: boolean;

  /** Cells to format differently e.g. to highlight a winning row/column **/
  highlightCells: number[];
}


export default function Board(props: BoardProps) {
  const validMoves: MoveChar[] = ['X', 'O'];
  const glyphs = ['❌', '⭕'];

  const renderCell = (idx: number) => {
    const moveIdx = validMoves.indexOf(props.moves[idx]);
    const isFilled = moveIdx >= 0;  // if moves[idx] contains recognised char, register move in cell
    const clickable = !props.readOnly && !isFilled;

    return (
      <Cell
        value={isFilled ? glyphs[moveIdx] : ''}
        clickable={clickable}
        onClick={() => clickable ? props.onClick(idx) : null}
        highlighted={props.highlightCells.includes(idx)}
      />
    )
  };

  return (
    <div className={"board"}>
      <div className={"board-row"}>
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
      </div>
      <div className={"board-row"}>
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
      </div>
      <div className={"board-row"}>
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </div>
    </div>
  )
}
