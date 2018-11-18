import * as React from "react";
import Helmet from "react-helmet";
import Cell from "../Cell";
import MarkerSelector from "../MarkerSelector";
import "./style.scss";

export type Marker = "X" | "O";
export type CellValue = Marker | "E";

type State = {
  cellValues: CellValue[];
  computer?: Marker;
  currPlayer: Marker;
  gameOver: boolean;
  player?: Marker;
};

class App extends React.Component<{}, State> {
  private gameWinner: React.RefObject<HTMLDivElement>;
  private winningCombos: number[][];

  constructor(props: {}) {
    super(props);
    this.gameWinner = React.createRef();
    this.winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  }

  state = {
    cellValues: ["E", "E", "E", "E", "E", "E", "E", "E", "E"] as CellValue[],
    computer: undefined,
    currPlayer: "X" as Marker,
    gameOver: false,
    player: undefined
  };

  componentDidUpdate() {
    const { cellValues, computer, currPlayer, gameOver } = this.state;
    const winnerInfo = this.gameWinner;
    // Necessary to change to previous player as state has already changed to new player
    const player = currPlayer === "X" ? "O" : "X";
    if (
      this.checkWinningCombos(player) &&
      gameOver === false &&
      winnerInfo.current
    ) {
      winnerInfo.current.innerHTML = `${player} WON!`;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ gameOver: true });
      this.clearBoard();
    } else if (
      cellValues.indexOf("E") === -1 &&
      gameOver === false &&
      winnerInfo.current
    ) {
      winnerInfo.current.innerHTML = "IT'S A TIE!";
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ gameOver: true });
      this.clearBoard();
    } else if (
      currPlayer === computer &&
      cellValues.indexOf("E") > -1 &&
      gameOver === false
    ) {
      this.computerSelectCell();
    }
  }

  clearBoard = () => {
    setTimeout(() => {
      const winnerInfo = this.gameWinner;
      this.setState({
        cellValues: ["E", "E", "E", "E", "E", "E", "E", "E", "E"],
        currPlayer: "X",
        gameOver: false
      });
      if (winnerInfo.current) {
        winnerInfo.current.innerHTML = "";
      }
    }, 3000);
  };

  playerSelectMarker = (marker: "X" | "O") => {
    const computer = marker === "X" ? "O" : "X";
    const modal = document.getElementById("playerSelect");
    if (modal) {
      modal.style.display = "none";
    }
    this.setState({ computer, player: marker });
  };

  playerSelectCell = (cellId: number) => {
    this.setState(state => {
      const { cellValues } = state;
      cellValues[cellId] = state.player as Marker;
      return {
        ...state,
        cellValues,
        currPlayer: state.computer as Marker
      };
    });
  };

  computerSelectCell = () => {
    const { cellValues, computer, player } = this.state;
    const { winningCombos } = this;

    function checkForPotentialWinOrBlock(
      cells: CellValue[],
      playerToken: Marker
    ) {
      for (let i = 0; i < winningCombos.length; i += 1) {
        const controlled = [];
        let trueCount = 0;
        for (let j = 0; j < 3; j += 1) {
          const value = winningCombos[i][j];
          if (cells[value] === playerToken) {
            controlled.push(true);
            trueCount += 1;
          } else {
            controlled.push(false);
          }
        } // End winningCombos subarray for loop
        const index = controlled.indexOf(false);
        if (trueCount === 2 && cells[winningCombos[i][index]] === "E") {
          return winningCombos[i][index];
        }
      } // End winningCombos for loop
      return null;
    }

    function randomCell(cells: CellValue[]): number {
      const emptyCells = cells
        .map((val, i) => (val === "E" ? i : null))
        .filter(Boolean) as number[];
      const random = Math.floor(Math.random() * emptyCells.length);
      return emptyCells[random];
    }

    const selectWin = computer
      ? checkForPotentialWinOrBlock(cellValues, computer)
      : null;
    const blockWin = player
      ? checkForPotentialWinOrBlock(cellValues, player)
      : null;
    this.setState(state => {
      const { cellValues, computer, player } = state;
      if (computer) {
        if (typeof selectWin === "number") {
          cellValues[selectWin] = computer;
        } else if (typeof blockWin === "number") {
          cellValues[blockWin] = computer;
        } else {
          const emptyCell = randomCell(cellValues);
          cellValues[emptyCell] = computer;
        }
      }
      return {
        ...state,
        cellValues,
        currPlayer: player as Marker
      };
    });
  };

  checkWinningCombos = (player: Marker) => {
    const { cellValues } = this.state;
    const controlledStatus = this.winningCombos.map(combo =>
      combo.every(val => cellValues[val] === player)
    );
    return controlledStatus.indexOf(true) > -1;
  };

  render() {
    const { cellValues, currPlayer, player } = this.state;
    return (
      <div className="ttt-game-wrapper">
        <Helmet>
          <title>Tic Tac Toe Game | Daniel Lemay</title>
          <link
            href="https://fonts.googleapis.com/css?family=Bitter:400i|Indie+Flower"
            rel="stylesheet"
          />
        </Helmet>
        <MarkerSelector playerSelectMarker={this.playerSelectMarker} />
        <div ref={this.gameWinner} className="ttt-game-winner" />
        <table className="ttt-game-board">
          <tbody>
            <tr>
              <Cell
                id={0}
                cellValue={cellValues[0]}
                currPlayer={currPlayer}
                player={player}
                playerSelectCell={this.playerSelectCell}
              />
              <Cell
                id={1}
                cellValue={cellValues[1]}
                currPlayer={currPlayer}
                player={player}
                playerSelectCell={this.playerSelectCell}
              />
              <Cell
                id={2}
                cellValue={cellValues[2]}
                currPlayer={currPlayer}
                player={player}
                playerSelectCell={this.playerSelectCell}
              />
            </tr>
            <tr>
              <Cell
                id={3}
                cellValue={cellValues[3]}
                currPlayer={currPlayer}
                player={player}
                playerSelectCell={this.playerSelectCell}
              />
              <Cell
                id={4}
                cellValue={cellValues[4]}
                currPlayer={currPlayer}
                player={player}
                playerSelectCell={this.playerSelectCell}
              />
              <Cell
                id={5}
                cellValue={cellValues[5]}
                currPlayer={currPlayer}
                player={player}
                playerSelectCell={this.playerSelectCell}
              />
            </tr>
            <tr>
              <Cell
                id={6}
                cellValue={cellValues[6]}
                currPlayer={currPlayer}
                player={player}
                playerSelectCell={this.playerSelectCell}
              />
              <Cell
                id={7}
                cellValue={cellValues[7]}
                currPlayer={currPlayer}
                player={player}
                playerSelectCell={this.playerSelectCell}
              />
              <Cell
                id={8}
                cellValue={cellValues[8]}
                currPlayer={currPlayer}
                player={player}
                playerSelectCell={this.playerSelectCell}
              />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
