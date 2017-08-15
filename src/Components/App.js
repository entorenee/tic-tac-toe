import React from 'react';
import Cell from './Cell';
import '../style/App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cellValues: ["none","none","none","none","none","none","none","none","none"], // Used to track who controls each space.
      currPlayer: "X"
    };

    this.playerSelectCell = this.playerSelectCell.bind(this);
  }

  playerSelectCell(cellValue, cellId) {
    if (cellValue === "none") {
       var states = {...this.state};
       states.cellValues[cellId] = this.state.currPlayer;
       states.currPlayer = this.state.currPlayer === "X" ? "O" : "X";
       this.setState({...states});
    }

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
