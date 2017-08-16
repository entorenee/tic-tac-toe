import React from 'react';
import Cell from './Cell';
import '../style/App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cellValues: ["E","E","E","E","E","E","E","E","E"], // Used to track who controls each space.
      currPlayer: "X",
      player: "X",
      computer: "O"
    };

    this.playerSelectCell = this.playerSelectCell.bind(this);
    this.checkWinningCombos = this.checkWinningCombos.bind(this);
    this.computerSelectCell = this.computerSelectCell.bind(this);
  }

  componentDidUpdate() {
    if (this.state.currPlayer === this.state.computer && this.state.cellValues.indexOf('E') > -1) {
      this.computerSelectCell();
    }
  }

  playerSelectCell(cellValue, cellId) {
    if (cellValue === "E" && this.state.currPlayer === this.state.player) {
       var states = {...this.state};
       states.cellValues[cellId] = this.state.currPlayer;
       states.currPlayer = this.state.computer;
       var winnerInfo = document.getElementById('gameWinner');
       if (this.checkWinningCombos(states.cellValues, this.state.currPlayer)) {
         winnerInfo.innerHTML = this.state.currPlayer + " won";
       } else if (states.cellValues.indexOf("E") === -1) {
         winnerInfo.innerHTML = "It's a tie.";
       }

       this.setState({...states});
    }

  }

  computerSelectCell() {
    // first check if can win. If so, select win.
    // second check if need to block.
    // if none of above are possible select empty cell.
    var states = {...this.state};

    function randomCell(cellValues) {
      var cell,
      blankCell = false;

      while (!blankCell) {
        cell = Math.floor(Math.random() * 8);
        if (cellValues[cell] === "E") {
          blankCell = true;
        }
      }
      return cell;
    }

    // var emptyCell = randomCell(this.state.cellValues);
    var emptyCell = this.state.cellValues.indexOf('E');
    console.log(emptyCell);
    states.cellValues[emptyCell] = "O";
    states.currPlayer = "X";
    this.setState({...states});
  }

  checkWinningCombos(cellValues, currPlayer) {
    var winningCombos = [
      ["0","1","2"],
      ["3","4","5"],
      ["6","7","8"],
      ["0","3","6"],
      ["1","4","7"],
      ["2","5","8"],
      ["0","4","8"],
      ["2","4","6"]
    ]
    for (var i=0; i < winningCombos.length; i++) {
      let arr = winningCombos[i];
      if (cellValues[arr[0]] === currPlayer && cellValues[arr[1]] === currPlayer && cellValues[arr[2]] === currPlayer) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div id="game">
        <div id="gameWinner"></div>
        <table>
          <tbody>
            <tr>
              <Cell id="0" cellValue={this.state.cellValues[0]} playerSelectCell={this.playerSelectCell} />
              <Cell id="1" cellValue={this.state.cellValues[1]} playerSelectCell={this.playerSelectCell} />
              <Cell id="2" cellValue={this.state.cellValues[2]} playerSelectCell={this.playerSelectCell} />
            </tr>
            <tr>
              <Cell id="3" cellValue={this.state.cellValues[3]} playerSelectCell={this.playerSelectCell} />
              <Cell id="4" cellValue={this.state.cellValues[4]} playerSelectCell={this.playerSelectCell} />
              <Cell id="5" cellValue={this.state.cellValues[5]} playerSelectCell={this.playerSelectCell} />
            </tr>
            <tr>
              <Cell id="6" cellValue={this.state.cellValues[6]} playerSelectCell={this.playerSelectCell} />
              <Cell id="7" cellValue={this.state.cellValues[7]} playerSelectCell={this.playerSelectCell} />
              <Cell id="8" cellValue={this.state.cellValues[8]} playerSelectCell={this.playerSelectCell} />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
