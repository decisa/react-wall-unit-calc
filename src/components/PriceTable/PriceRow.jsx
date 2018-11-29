import React, { Component } from "react";

class PriceRow extends Component {
  onChange = e => {
    e.preventDefault();
    console.log(e.target.value);
  };
  // state = {};
  render() {
    const prices = this.props.prices;
    //rowName={row} colNames={this} />
    const { rowName, colNames } = this.props;
    console.log("rowName", rowName);
    console.log("colNames", colNames);
    // console.log("row=", row);
    // return "hi";
    const elements = colNames.map(colName => {
      // <td></td>
      let price = prices[rowName][colName];
      if (price < 0) {
        console.log("empty");
        price = "";
      }
      console.log(`[${rowName}-${colName}] = ${price}`);
      return (
        <td key={`${rowName}-${colName}`}>
          <input
            type="number"
            value={price}
            placeholder="N/A"
            onChange={e => {
              this.props.onPriceChange(rowName, colName, e.target.value);
              console.log(`[${rowName}-${colName}] = ${e.target.value}`);
            }}
          />
        </td>
      );
    });
    return (
      <tr key={`row-${rowName}`}>
        <th>{rowName}</th>
        {elements}
      </tr>
    );
  }
}

export default PriceRow;
