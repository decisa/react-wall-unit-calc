import React, { Component } from "react";
import Total from "./Total";
import Part from "./Part";
import Element from "./Element";
import CompHeader from "./CompHeader";

class Composition extends Component {
  render() {
    const { onDelete, onIncrease, onDecrease, onLoadClick } = this.props;
    return (
      <React.Fragment>
        <header className="selection-head">
          <h1>Select Wall Unit</h1>
          <button className="button button-grey" onClick={onLoadClick}>
            Reset
          </button>
        </header>
        <main>
          <div className="composition">
            <CompHeader />
            {this.props.elements.map(element => (
              <Element
                key={element.id}
                element={element}
                newSelection={this.props.newSelection}
                onDelete={onDelete}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            ))}
            <Total elements={this.props.elements} />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Composition;
