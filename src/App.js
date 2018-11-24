import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Composition from "./components/Composition";
import Form from "./components/Form";
import RefForm from "./components/RefForm";
import loadWallUnit from "./wallUnits";

class App extends Component {
  state = {
    parts: [
      // { id: 0, qty: 1, price: 300 },
      // { id: 1, qty: 2, price: 250 },
      // { id: 2, qty: 1, price: 985 },
      // { id: 3, qty: 1, price: 474 }
    ],
    name: this.props.match.params.wallUnitId.replace(/-/g, " "),
    nextId: 0
  };

  handleQtyIncrease = part => {
    const parts = [...this.state.parts];
    const ind = parts.indexOf(part);
    parts[ind] = { ...part };
    parts[ind].qty += 1;
    this.setState({ parts });
  };

  handleQtyDecrease = part => {
    const parts = [...this.state.parts];
    const ind = parts.indexOf(part);
    parts[ind] = { ...part };
    parts[ind].qty -= 1;
    this.setState({ parts });
  };

  handleDelete = id => {
    console.log("trying to delete ", id);
    const parts = this.state.parts.filter(part => part.id !== id);
    this.setState({ parts });
  };

  handleAddNewPart = info => {
    console.log(info);
    const parts = [...this.state.parts];
    const newEntry = Object.assign({ id: this.state.nextId, qty: 1 }, info, {
      price: parseInt(info.price)
    });
    console.log(newEntry);
    parts.push(newEntry);
    this.setState({ parts, nextId: this.state.nextId + 1 });
  };

  handleLoadClick = () => {
    const parts = loadWallUnit(this.state.name);
    this.setState({ parts, nextId: parts.length });
  };

  render() {
    return (
      <main>
        <h1>Wall Unit {this.state.name}</h1>
        <Composition
          onDelete={this.handleDelete}
          onIncrease={this.handleQtyIncrease}
          onDecrease={this.handleQtyDecrease}
          onLoadClick={this.handleLoadClick}
          parts={this.state.parts}
        />
        <Form addNewPart={this.handleAddNewPart} />
        <hr />
        <RefForm />
      </main>
    );
  }
}

export default App;
