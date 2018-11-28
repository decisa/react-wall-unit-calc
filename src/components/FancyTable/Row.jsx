import React, { Component } from "react";

class Row extends Component {
  // state = {};
  render() {
    const { row, rowID } = this.props;
    // console.log("row=", row);
    // return "hi";
    const elements = row.map((e, column) => (
      <td>{e}</td>
      // <td key={`${rowID}-${column}`}>{e}</td>
    ));
    return <tr key={`row-${rowID}`}>{elements}</tr>;
  }
}

export default Row;
