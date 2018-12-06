import React, { Component } from "react";
import Quantity from "./Quantity";
import Price from "./Price";

class Element extends Component {
  changeSelect = e => {
    const attrID = e.target.name;
    const newAttrValue = e.target.value;
    this.props.newSelection(this.props.element, attrID, newAttrValue);
  };

  deletePart = () => {
    this.props.onDelete(this.props.element);
  };

  render() {
    // const partOptions = Object.entries(this.state.options).map(
    //   ([key, value]) => (
    //     <React.Fragment key={key}>
    //       <div className="part-option-name">{key}</div>
    //       {/* <div>:</div> */}
    //       <div>{value}</div>
    //     </React.Fragment>
    //   )
    // );

    // materials: {
    //   frame: ["materico", "matte lacquer"],
    //   doors: ["materico", "essenza wood", "glossy lacquer"]
    // }
    const {
      currentPrice,
      sizes,
      name,
      attributes,
      id,
      qty
    } = this.props.element;

    // create an array of <select> tags with labels
    const selections = attributes.map((attribute, attributeID) => {
      // const [name, options] = Object.entries(attribute)[0];
      // create an array of <option>'s for current select tag
      const optionsList = attribute.values.map((option, optionIndex) => {
        return <option value={optionIndex}>{option}</option>;
      });
      return (
        <React.Fragment>
          <label
            htmlFor={`${this.props.id}-${attributeID}`}
            className="part-option-name"
          >
            {attribute.name}
          </label>

          <select
            id={`${this.props.id}-${attributeID}`}
            name={attributeID}
            value={attribute.selected}
            onChange={this.changeSelect}
          >
            {optionsList}
          </select>
        </React.Fragment>
      );
    });

    return (
      <div className="part-container">
        <Quantity
          element={this.props.element}
          onIncrease={this.props.onIncrease}
          onDecrease={this.props.onDecrease}
        />
        <div className="part-description">
          <h3>{name}</h3>
          <div className="part-options">
            <div className="part-option-name">Size</div>
            <div>{`${sizes.width} × ${sizes.depth} × ${sizes.height}`}</div>
            {selections}
          </div>
        </div>
        <Price price={currentPrice} qty={1} />
        <Price price={currentPrice} qty={qty} />
        <button
          style={{ justifySelf: "center" }}
          className="button button-red button-square"
          onClick={this.deletePart}
        >
          &times;
        </button>
      </div>
    );
  }
}

export default Element;
