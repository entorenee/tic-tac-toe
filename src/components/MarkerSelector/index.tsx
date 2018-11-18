import * as React from "react";

import { Marker } from "../App";
import "./style.scss";

type Props = {
  playerSelectMarker: (marker: Marker) => void;
};

const MarkerSelector: React.SFC<Props> = props => {
  const { playerSelectMarker } = props;

  return (
    <div id="playerSelect" className="player-selector-modal">
      <div className="player-marker-selector">
        <h1>Choose Your Marker</h1>
        <div className="ttt-marker-wrap">
          <button
            className="ttt-marker ttt-select-x"
            onClick={() => playerSelectMarker("X")}
            type="button"
          >
            X
          </button>
          <button
            className="ttt-marker ttt-select-o"
            onClick={() => playerSelectMarker("O")}
            type="button"
          >
            O
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkerSelector;
