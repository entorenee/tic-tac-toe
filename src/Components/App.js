import React from 'react';
import Cell from './Cell';
import '../style/App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cellValues: [null,null,null,null,null,null,null,null,null] // Used to track who controls each space.
    };
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <Cell id="0" />
            <Cell id="1" />
            <Cell id="2" />
          </tr>
          <tr>
            <Cell id="3" />
            <Cell id="4" />
            <Cell id="5" />
          </tr>
          <tr>
            <Cell id="6" />
            <Cell id="7" />
            <Cell id="8" />
          </tr>
        </tbody>
      </table>
    );
  }
}

export default App;
