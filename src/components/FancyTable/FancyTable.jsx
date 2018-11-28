import React, { Component } from "react";
import TableHeader from "./TableHeader";
import Row from "./Row";

class FancyTable extends Component {
  state = {
    headers: ["one", "two", "three"],
    table: [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
  };

  swapRows = () => {
    const table = [...this.state.table];
    const tmp = table[1];
    table[1] = table[2];
    table[2] = tmp;
    this.setState({ table });
  };

  increase = () => {
    const table = [...this.state.table];
    table[1] = [...this.state.table[1]];
    table[1][1] += 1;
    this.setState({ table });
  };

  render() {
    const rows = this.state.table.map((row, rowId) => (
      <Row key={`row${rowId}`} row={row} rowId={rowId} />
    ));
    return (
      <div>
        <table>
          <tbody>
            <TableHeader headers={this.state.headers} />
            {rows}
          </tbody>
        </table>
        <button onClick={this.swapRows}>swap</button>
        <button onClick={this.increase}>+</button>
      </div>
    );
  }
}

export default FancyTable;
