import React, { Component } from "react";

class Price extends Component {
  // state = { value: this.props.price };

  render() {
    const available = this.props.price >= 0;
    return (
      <div className="part-price">
        {available
          ? `$${(this.props.price * this.props.qty).toFixed(2)}`
          : "N/A"}
      </div>
    );
  }
}

export default Price;
