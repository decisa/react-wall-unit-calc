import React, { Component } from 'react';
import Total from './Total';
import Part from "./Part";

class Composition extends Component {
  render() {
    const { onDelete, onIncrease, onDecrease, onLoadClick } = this.props;
    return (
      <React.Fragment>
        <header className="selection-head">
          <h1>Select Wall Unit</h1>
          <button className="button button-grey" onClick={onLoadClick}>
            Load
          </button>
        </header>
        <main>
          <div className="composition">
            {/* <div className="part-header" style="">Qty</div>
          <div className="part-header">Part Description</div>
          <div className="part-header">Price</div>
          <div className="part-header">Total</div>
          <div className="part-header">&times;</div> */}
            <div className="part-header">
              <div style={{ textAlign: "center" }}>Qty</div>
              <div>Part Description</div>
              <div style={{ textAlign: "right" }}>Price</div>
              <div style={{ textAlign: "right" }}>Total</div>
              <div style={{ textAlign: "center" }}>&times;</div>
            </div>

            {this.props.parts.map(part => (
              <Part
                key={part.id}
                part={part}
                onDelete={onDelete}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            ))}
            <Total parts={this.props.parts} />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Composition;

