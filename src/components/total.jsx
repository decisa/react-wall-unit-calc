import React, { Component } from 'react'

export class Total extends Component {
  render() {
    const total = this.props.parts.reduce((a, c) => a + c.qty * c.price, 0);
    return (
      <div className="total-price">
        Total: ${ total.toFixed(2) }       
      </div>
    )
  }
}

export default Total
