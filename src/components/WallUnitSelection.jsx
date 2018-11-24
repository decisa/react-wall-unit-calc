import React, { Component } from "react";

class WallUnitSelection extends Component {
  handleClick = e => {
    e.preventDefault();
    this.props.history.push(`/wall/Tomasella-A054`);
  };
  // state = {  }
  render() {
    return (
      <React.Fragment>
        <header className="selection-head">
          <h1>Select Wall Unit</h1>
          <button
            className="button button-grey"
            onClick={this.props.onLoadClick}
          >
            Load
          </button>
        </header>
        <main>
          <button className="button button-grey" onClick={this.handleClick}>
            Tomasella A054
          </button>
        </main>
      </React.Fragment>
    );
  }
}
export default WallUnitSelection;
