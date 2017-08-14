import React from 'react';
import PropTypes from 'prop-types';
import '../style/Cell.css'

class Cell extends React.Component {
  render() {
    return (
      <td id={"cell-" + this.props.id}>
        {this.props.id}
      </td>
    )
  }
}

Cell.propTypes = {
  id: PropTypes.string.isRequired
}

export default Cell;
