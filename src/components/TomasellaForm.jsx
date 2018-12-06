import React, { Component } from "react";
import getAttributesByBrand from "../js/brands";
import PriceTable from "./PriceTable/PriceTable";

class TomasellaForm extends Component {
  state = {
    loading: true,
    name: "",
    sizes: {
      width: -1,
      depth: -1,
      height: -1
    },
    attributes: [], // [{attrName1:[materico, matte, ... ]}, {attrName2: [...]}, ... ]
    // attributeNames: [], // [attrName1, attrName2, ...]
    selectedAttributes: [
      ["matte lacquer", "glossy lacquer"],
      ["materico", "essenza wood"]
    ],
    // currently I have selectedDoors = [selectedAttr1, selectedAttr2 , etc];
    // supposedly I can have it as an array of filtered arrays
    //  selectedAttributes: [[filtered array for attrName1], [filtered array for attrName2] , ...]
    //
    //
    prices: {
      "matte lacquer": {
        "essenza wood": 595
      }
    }
  };

  getPrice = (attributes, prices) => {
    return attributes.reduce((price, attribute) => {
      return price[attribute];
    }, prices);
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
      prices: {},
      attributes: []
    };

    newProduct.attributes = this.state.selectedAttributes.map((attr, id) => {
      return Object.assign(
        {},
        { values: attr, name: this.state.attributes[id].name, selected: 0 }
      );
    });

    // generate prices object based on selected attributes (ignore non selected)
    // supports 2 attributes only now
    this.state.selectedAttributes[0].reduce((prices, attr1) => {
      prices[attr1] = {};
      this.state.selectedAttributes[1].reduce((prices, attr2) => {
        prices[attr2] = this.state.prices[attr1][attr2];
        return prices;
      }, prices[attr1]);
      return prices;
    }, newProduct.prices);
    this.props.onSubmit(newProduct);
    console.log("new product = ", newProduct);
  };

  componentDidMount() {
    // get data about available finishes from BD / js file
    const attributes = getAttributesByBrand(this.props.brand);
    // const attributeNames = attributes.map(elem => Object.keys(elem)[0]);
    // const [frame, doors] = attributes;
    // copy initial values for prices:
    const prices = { ...this.state.prices };

    // {frame: {doors: price}}

    // frame.reduce((price, frame) => {
    //   if (!price[frame]) {
    //     price[frame] = {};
    //   }
    //   for (const door of doors) {
    //     if (!price[frame][door]) {
    //       price[frame][door] = -1;
    //     }
    //   }
    //   return price;
    // }, prices);

    // const frame = attributes[0].frame;
    // const doors = attributes[1].doors;
    // console.log("frame = ", frame);
    // console.log("doors = ", doors);
    // initialize missing prices with -1, in the same order as defined in attributes
    attributes[0].values.reduce((priceObject, attribute) => {
      if (!priceObject[attribute]) {
        priceObject[attribute] = {};
      }
      for (const secondAttribute of attributes[1].values) {
        if (!priceObject[attribute][secondAttribute]) {
          priceObject[attribute][secondAttribute] = -1;
        }
      }
      return priceObject;
    }, prices);

    this.setState({ prices, attributes, loading: false });
  }

  // helper function to render checkboxes of available finishes
  // creates a fieldset with legend = name , and options = elements of array
  renderCheckboxes = (name, id, array) => {
    const inputs = array.map(elem => {
      const checked =
        this.state.selectedAttributes[id] &&
        this.state.selectedAttributes[id].includes(elem);

      return (
        <React.Fragment>
          <label>
            <input type="checkbox" checked={checked} name={name} value={elem} />
            {elem}
          </label>
          <br />
        </React.Fragment>
      );
    });

    return (
      <fieldset onChange={this.onSelect} name={id}>
        <legend>{name} options</legend>
        {inputs}
      </fieldset>
    );
  };

  // updates the state of selectedDoors and selectedFrames
  onSelect = e => {
    const attributeID = e.currentTarget.name;
    const selectedAttributes = [...this.state.selectedAttributes];

    selectedAttributes[attributeID] = [...e.currentTarget.elements].reduce(
      (a, c) => {
        if (c.checked) a.push(c.value);
        return a;
      },
      []
    );

    this.setState({ selectedAttributes });
  };

  render() {
    const attributeSelectors = this.state.attributes.map(
      (attribute, attributeID) => {
        return this.renderCheckboxes(
          attribute.name,
          attributeID,
          attribute.values
        );
      }
    );

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

        {attributeSelectors}
        {/* {this.renderCheckboxes("Frame", this.state.frame)}
        {this.renderCheckboxes("Doors", this.state.doors)} */}

        {this.state.loading ? null : (
          <PriceTable
            rows={this.state.selectedAttributes[0]}
            columns={this.state.selectedAttributes[1]}
            prices={this.state.prices}
            onPriceChange={this.onPriceChange}
          />
        )}
        <button className="button button-red">Submit</button>
      </form>
    );
  }
}

export default TomasellaForm;
