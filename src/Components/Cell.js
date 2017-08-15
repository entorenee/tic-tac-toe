import React from 'react';
import PropTypes from 'prop-types';
import '../style/Cell.css'

class Cell extends React.Component {
  render() {
    var cellValue = this.props.cellValue !== "none" ? this.props.cellValue : "";
    return (
      <td id={"cell-" + this.props.id} onClick={() => this.props.playerSelectCell(this.props.cellValue, this.props.id)}>
        {cellValue}
      </td>
    )
  }
}

Cell.propTypes = {
  id: PropTypes.string.isRequired,
  cellValue: PropTypes.string.isRequired,
  playerSelectCell: PropTypes.func.isRequired
}

export default Cell;
