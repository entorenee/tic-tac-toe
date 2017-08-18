import React from 'react';
import PropTypes from 'prop-types';
import '../style/Cell.css'

class Cell extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (nextProps.cellValue !== this.props.cellValue) {
      return true;
    }
    return false;
  }

  render() {
    var cellValue = this.props.cellValue !== "E" ? this.props.cellValue : "";
    if (this.props.cellValue === "X") {
      document.getElementById('cell-' + this.props.id).classList.add('x-marker');
    }
    if (this.props.cellValue === "O") {
      document.getElementById('cell-' + this.props.id).classList.add('o-marker');
    }
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
