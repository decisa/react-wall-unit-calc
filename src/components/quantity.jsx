import React, { Component } from "react";

class QuantitySelector extends Component {
  // state = { value: this.props.qty };

  handleIncrement = () => {
    this.props.onIncrease(this.props.part);
  };

  handleDecrement = () => {
    if (this.props.part.qty > 0) this.props.onDecrease(this.props.part);
  };
  render() {
    return (
      <div className="quantity">
        Qty: {this.props.part.qty || 1}
        <br />
        <button
          className="button button-grey button-square"
          onClick={this.handleIncrement}
        >
          +
        </button>
        <button
          className="button button-grey button-square"
          onClick={this.handleDecrement}
        >
          -
        </button>
      </div>
    );
  }
}

export default QuantitySelector;
