import React from 'react';
import PropTypes from 'prop-types';
import '../style/MarkerSelector.css';

class MarkerSelector extends React.Component {
  render() {
    return (
      <div id="player-selector-modal">
        <div id="player-marker-selector">
          <h1>Choose Your Marker</h1>
          <div id="marker-wrap">
            <div id="select-x" className="marker" onClick={() => this.props.playerSelectMarker("X")}>X</div>
            <div id="select-o" className="marker" onClick={() => this.props.playerSelectMarker("O")}>O</div>
          </div>
        </div>
      </div>
    )
  }
}

MarkerSelector.propTypes = {
  playerSelectMarker: PropTypes.func.isRequired
}

export default MarkerSelector;
