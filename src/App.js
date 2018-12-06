import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Composition from "./components/Composition";
import Form from "./components/Form";
import RefForm from "./components/RefForm";
import loadWallUnit from "./wallUnits";
import FancyTable from "./components/FancyTable/FancyTable";
import TomasellaForm from "./components/TomasellaForm";
import update from "immutability-helper";

//{"materico":{"materico":"20",,},,}

const elementX = {
  name: "180cm cabinet",
  qty: 2,
  sizes: {
    width: 180,
    depth: 45,
    height: 38
  },
  attributes: [
    {
      name: "Frame",
      selected: 1,
      values: ["materico", "matte lacquer"]
    },
    {
      name: "Doors",
      selected: 2,
      values: ["materico", "essenza wood", "glossy lacquer"]
    }
  ],
  prices: {
    materico: {
      materico: 20,
      "essenza wood": 30,
      "glossy lacquer": 40
    },
    "matte lacquer": {
      materico: 50,
      "essenza wood": 60,
      "glossy lacquer": -1
    }
  },
  currentPrice: 60
};

const element1 = {
  name: "180cm cabinet",
  qty: 3,
  sizes: { width: 50, depth: 60, height: 45 },
  prices: {
    materico: {
      materico: "12",
      "matte lacquer": "21",
      "essenza wood": "111",
      "glossy lacquer": "878",
      "something new": "896"
    },
    "matte lacquer": {
      materico: "5656",
      "matte lacquer": "454",
      "essenza wood": 595,
      "glossy lacquer": "454",
      "something new": "33"
    },
    "glossy lacquer": {
      materico: "545",
      "matte lacquer": "47",
      "essenza wood": "767",
      "glossy lacquer": "454",
      "something new": "34"
    }
  },
  currentPrice: 12,
  attributes: [
    {
      values: ["materico", "matte lacquer", "glossy lacquer"],
      name: "Base",
      selected: 0
    },
    {
      values: [
        "materico",
        "matte lacquer",
        "essenza wood",
        "glossy lacquer",
        "something new"
      ],
      name: "Top",
      selected: 0
    }
  ]
};

class App extends Component {
  state = {
    parts: [],
    elements: [
      Object.assign({}, element1, { id: 0 }),
      Object.assign({}, elementX, { id: 0 })
    ],
    name: this.props.match.params.wallUnitId.replace(/-/g, " "),
    nextId: 0
  };

  handleQtyIncrease = element => {
    const elements = [...this.state.elements];
    const ind = elements.indexOf(element);
    elements[ind] = { ...element };
    elements[ind].qty += 1;
    this.setState({ elements });
  };

  handleQtyDecrease = element => {
    const elements = [...this.state.elements];
    const ind = elements.indexOf(element);
    elements[ind] = { ...element };
    elements[ind].qty -= 1;
    this.setState({ elements });
  };

  handleDelete = element => {
    const indexToDelete = this.state.elements.indexOf(element);

    console.log("trying to delete line number : ", indexToDelete);

    const elements = this.state.elements.filter(
      (element, ind) => ind !== indexToDelete
    );
    this.setState({ elements });
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

  handleSubmit = newComponent => {
    const elements = [...this.state.elements];
    if (!newComponent.currentPrice) {
      newComponent.currentPrice = this.getElementPrice(newComponent);
    }

    if (!newComponent.qty) {
      newComponent.qty = 1;
    }
    elements.push(newComponent);
    this.setState({ elements });
  };

  handleNewSelection = (element, attributeId, newValue) => {
    const elementIndex = this.state.elements.indexOf(element);

    const elements = update(this.state.elements, {
      [elementIndex]: {
        attributes: {
          [attributeId]: { selected: { $set: newValue } }
        }
      }
    });

    elements[elementIndex].currentPrice = this.getElementPrice(
      elements[elementIndex]
    );

    console.log("old price", this.state.elements[elementIndex].currentPrice);
    console.log("new price", elements[elementIndex].currentPrice);

    // const selected = elements[elementIndex].map(material => )

    this.setState({ elements });
  };

  getPrice = (selections, prices) => {
    return parseInt(selections.reduce((price, value) => price[value], prices));
  };

  getElementPrice = element => {
    // get the names of selected attribute values
    const selectedValues = element.attributes.map(attribute => {
      return attribute.values[attribute.selected];
    });

    // get selected price recursively :
    return this.getPrice(selectedValues, element.prices);
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
          elements={this.state.elements}
          newSelection={this.handleNewSelection}
        />

        <hr />
        <TomasellaForm brand="Tomasella" onSubmit={this.handleSubmit} />
      </main>
    );
  }
}

export default App;
