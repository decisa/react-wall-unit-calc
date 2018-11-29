import React, { Component } from "react";

class PriceHeader extends Component {
  // state = {};
  render() {
    const headers = this.props.headers.map((e, column) => (
      <th key={`header-${column}`}>{e}</th>
    ));

    return (
      <tr>
        <td />
        {headers}
      </tr>
    );
  }
}

export default PriceHeader;
