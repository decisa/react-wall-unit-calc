import React, { Component } from "react";
import PriceHeader from "./PriceHeader";
import PriceRow from "./PriceRow";

class PriceTable extends Component {
  state = {
    headers: ["one", "two", "three"],
    table: [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
  };

  swapRows = () => {
    this.props.swapRows();
  };

  increase = () => {
    const table = [...this.state.table];
    table[1] = [...this.state.table[1]];
    table[1][1] += 1;
    this.setState({ table });
  };

  render() {
    const rows = this.props.rows.map((row, rowId) => (
      <PriceRow
        key={`row-${row}`}
        rowName={row}
        colNames={this.props.columns}
        prices={this.props.prices}
        onPriceChange={this.props.onPriceChange}
      />
    ));
    return (
      <div className="form-container">
        <table>
          <tbody>
            <PriceHeader headers={this.props.columns} />
            {rows}
          </tbody>
        </table>
        <button onClick={this.swapRows}>swap</button>
        <button onClick={this.increase}>+</button>
      </div>
    );
  }
}

export default PriceTable;
