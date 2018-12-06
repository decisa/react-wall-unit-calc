import React, { Component } from "react";

export class Total extends Component {
  render() {
    const total = this.props.elements.reduce((a, c) => {
      if (c.currentPrice < 0) return a;
      else return a + c.qty * c.currentPrice;
    }, 0);
    return <div className="total-price">Total: ${total.toFixed(2)}</div>;
  }
}

export default Total;
