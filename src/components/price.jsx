import React, { Component } from "react";

class Price extends Component {
  // state = { value: this.props.price };

  render() {
    return (
      <div className="part-price">
        ${(this.props.price * this.props.qty).toFixed(2)}
      </div>
    );
  }
}

export default Price;
