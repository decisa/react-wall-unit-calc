import React, { Component } from "react";
import getAttributesByBrand from "../js/brands";

class TomasellaForm extends Component {
  state = {
    name: "",
    price: 0,
    frame: [], // ["materico", "matte lacquer"],
    doors: [], //["matte lacquer", "essenza wood", "glossy lacquer"],
    selectedFrame: [],
    selectedDoors: [],
    prices: {
      "matte lacquer": {
        'essenza wood': 595
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = e => {
    e.preventDefault();
    console.log(
      `New Price matrix is ${this.state.selectedFrame.length} × ${
      this.state.selectedDoors.length
      }`
    );
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
          price[frame][door] = {};
        }
      }
      return price;

    }, prices);
    // console.log(prices);

    this.setState({ frame, doors, prices });
  }

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
        {this.renderCheckboxes("Frame", this.state.frame)}
        {this.renderCheckboxes("Doors", this.state.doors)}

        <button>Add</button>
      </form>
    );
  }
}

export default TomasellaForm;
