import * as React from 'react';
import classNames from 'classnames';
import { keyboardHandler } from '../helpers';
import '../style/Cell.css';

type Props = {
  id: string,
  cellValue: string,
  playerSelectCell: () => void,
};

const Cell: React.SFC<Props> = (props) => {
  const { cellValue, id, playerSelectCell } = props;
  const cellDisplay = cellValue !== 'E' ? cellValue : '';

  return (
    <td className={`cells cell-${id}`}>
      <div
        className={classNames({
          'o-marker': cellValue === 'O',
          'x-marker': cellValue === 'X',
        })}
        onClick={() => playerSelectCell(cellValue, id)}
        onKeyPress={e => {
          if (keyboardHandler(e)) playerSelectCell(cellValue, id);
        }}
        role="button"
        tabIndex={0}
      >
        {cellDisplay}
      </div>
    </td>
  );
}

export default Cell;
