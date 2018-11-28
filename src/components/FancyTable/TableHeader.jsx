import React, { Component } from "react";

class TableHeader extends Component {
  // state = {};
  render() {
    const headers = this.props.headers.map((e, column) => (
      <th key={`header-${column}`}>{e}</th>
    ));

    return <tr>{headers}</tr>;
  }
}

export default TableHeader;
