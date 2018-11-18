import * as React from "react";
import classNames from "classnames";

import { CellValue, Marker } from "../App";
import "./style.scss";

type Props = {
  cellValue: CellValue;
  currPlayer: Marker;
  id: number;
  player?: Marker;
  playerSelectCell: (id: number) => void;
};

const Cell: React.SFC<Props> = props => {
  const { cellValue, currPlayer, id, player, playerSelectCell } = props;
  const cellDisplay = cellValue !== "E" ? cellValue : "";

  return (
    <td className={`cells cell-${id}`}>
      <button
        className={classNames({
          "o-marker": cellValue === "O",
          "x-marker": cellValue === "X"
        })}
        disabled={cellValue !== "E" || currPlayer !== player}
        onClick={() => playerSelectCell(id)}
        type="button"
      >
        {cellDisplay}
      </button>
    </td>
  );
};

export default Cell;
