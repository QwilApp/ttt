import React from "react";
import Board, { MoveChar } from "./Board";

type GameState = {
  moves: MoveChar[];  // Array representing the game board
  numMoves: number;  // Number of moves made by users so far. Used to quickly determine a tie.
  xIsNext: boolean;  // Used to toggle between X and O player
  winnerLine: number[] | null;  // If winner found, holds indices of winning line on the game board
}

type GameProps = {}

const getInitialState = (): GameState => ({
  moves: new Array(9).fill(null),
  xIsNext: true,
  winnerLine: null,
  numMoves: 0,
})


export class Game extends React.Component<GameProps, GameState> {
  state: GameState = getInitialState();

  resetGame = () => this.setState(getInitialState());

  handleClick = (idx: number) => {
    if (this.state.winnerLine || this.state.numMoves > 8) {
      return;
    }

    let newMoves = this.state.moves.slice();
    newMoves[idx] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      moves: newMoves,
      xIsNext: !this.state.xIsNext,
      winnerLine: calculateWinnerLine(newMoves),
      numMoves: this.state.numMoves + 1,
    })
  }

  render() {
    let gameComplete = false;
    let headerText = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;

    if (this.state.winnerLine) {
      gameComplete = true;
      headerText = `Winner: ${this.state.moves[this.state.winnerLine[0]]}`;
    } else if (this.state.numMoves > 8) {
      gameComplete = true;
      headerText = "It's a tie!"
    }

    return (
      <div className={"game"}>
        <div className={"game-heading"}>
          {headerText}
        </div>

        <Board
          moves={this.state.moves}
          onClick={this.handleClick}
          readOnly={gameComplete}
          highlightCells={this.state.winnerLine || []}
        />

        <div className={"game-footer"}>
          {gameComplete ? (
            <button onClick={this.resetGame}>Play again</button>
          ) : null}
        </div>
      </div>
    )
  }
}


function calculateWinnerLine(moves: MoveChar[]): number[] | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
      return lines[i];
    }
  }
  return null;
}
