import React from 'react';
import Cell from './Cell';
import '../style/App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cellValues: ["E","E","E","E","E","E","E","E","E"], // Used to track who controls each space.
      currPlayer: "X"
    };

    this.playerSelectCell = this.playerSelectCell.bind(this);
    this.checkWinningCombos = this.checkWinningCombos.bind(this);
  }

  playerSelectCell(cellValue, cellId) {
    if (cellValue === "E") {
       var states = {...this.state};
       states.cellValues[cellId] = this.state.currPlayer;
       states.currPlayer = this.state.currPlayer === "X" ? "O" : "X";
       if (this.checkWinningCombos(states.cellValues, this.state.currPlayer)) {
         console.log(this.state.currPlayer + " won!");
       } else if (states.cellValues.indexOf("E") === -1) {
         console.log ("It's a tie");
       }

       this.setState({...states});
    }

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
    );
  }
}

export default App;
