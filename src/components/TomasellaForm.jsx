import React, { Component } from "react";
import getAttributesByBrand from "../js/brands";
import PriceTable from "./PriceTable/PriceTable";

class TomasellaForm extends Component {
  state = {
    name: "",
    sizes: {
      width: -1,
      depth: -1,
      height: -1
    },
    frame: [], // ["materico", "matte lacquer"],
    doors: [], //["matte lacquer", "essenza wood", "glossy lacquer"],
    selectedFrame: [],
    selectedDoors: [],
    prices: {
      "matte lacquer": {
        "essenza wood": 595
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSizeChange = e => {
    const newSizes = { ...this.state.sizes };
    if (e.target.value === "") {
      newSizes[e.target.name] = -1;
    } else {
      newSizes[e.target.name] = parseInt(e.target.value);
    }
    this.setState({ sizes: newSizes });
  };

  onPriceChange = (row, column, newPrice) => {
    const prices = { ...this.state.prices };
    prices[row] = { ...this.state.prices[row] };
    prices[row][column] = newPrice;

    this.setState({ prices });
  };

  submitForm = e => {
    e.preventDefault();
    const newProduct = {
      name: this.state.name,
      sizes: { ...this.state.sizes },
      prices: {}
    };

    this.state.selectedFrame.reduce((prices, frameKey) => {
      prices[frameKey] = {};

      this.state.selectedDoors.reduce((prices, doorKey) => {
        prices[doorKey] = this.state.prices[frameKey][doorKey];

        return prices;
      }, prices[frameKey]);

      return prices;
    }, newProduct.prices);

    console.log(newProduct);
  };

  componentDidMount() {
    // get data about available finishes from BD / js file
    const { frame, doors } = getAttributesByBrand(this.props.brand);
    const prices = { ...this.state.prices };
    console.log(prices);
    frame.reduce((price, frame) => {
      if (!price[frame]) {
        price[frame] = {};
      }
      for (const door of doors) {
        if (!price[frame][door]) {
          price[frame][door] = -1;
        }
      }
      return price;
    }, prices);

    this.setState({ frame, doors, prices });
  }

  // helper function to render checkboxes of available finishes
  renderCheckboxes = (name, array) => {
    const inputs = array.map(elem => {
      return (
        <React.Fragment>
          <label>
            <input type="checkbox" name={name} value={elem} />
            {elem}
          </label>
          <br />
        </React.Fragment>
      );
    });

    return (
      <fieldset onChange={this.onSelect}>
        <legend>{name} options</legend>
        {inputs}
      </fieldset>
    );
  };

  // just for fun testing. need to delete on clean up
  swapRows = () => {
    const selectedFrame = [...this.state.selectedFrame];
    const temp = selectedFrame[0];
    selectedFrame[0] = selectedFrame[1];
    selectedFrame[1] = temp;

    this.setState({ selectedFrame });
  };

  // updates the state of selectedDoors and selectedFrames
  onSelect = e => {
    const selectedItems = [...e.currentTarget.elements].reduce((a, c) => {
      if (c.checked) a.push(c.value);
      return a;
    }, []);
    this.setState({ [`selected${e.target.name}`]: selectedItems });
  };

  render() {
    return (
      <form className="new-part" onSubmit={this.submitForm}>
        <label>Part name</label>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={this.state.name}
          onChange={this.onChange}
        />
        <input
          className="new-part-sizes"
          placeholder="W"
          type="number"
          onChange={this.onSizeChange}
          name="width"
          value={this.state.sizes.width >= 0 ? this.state.sizes.width : ""}
        />
        <input
          className="new-part-sizes"
          placeholder="D"
          type="number"
          onChange={this.onSizeChange}
          name="depth"
          value={this.state.sizes.depth >= 0 ? this.state.sizes.depth : ""}
        />
        <input
          className="new-part-sizes"
          placeholder="H"
          type="number"
          onChange={this.onSizeChange}
          name="height"
          value={this.state.sizes.height >= 0 ? this.state.sizes.height : ""}
        />
        {this.renderCheckboxes("Frame", this.state.frame)}
        {this.renderCheckboxes("Doors", this.state.doors)}

        <PriceTable
          rows={this.state.selectedFrame}
          columns={this.state.selectedDoors}
          prices={this.state.prices}
          onPriceChange={this.onPriceChange}
          swapRows={this.swapRows}
        />
        <button className="button button-red">Submit</button>
      </form>
    );
  }
}

export default TomasellaForm;
