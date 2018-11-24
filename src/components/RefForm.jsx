import React, { Component } from "react";

class RefForm extends Component {
  nameRef = React.createRef();
  sizeRef = React.createRef();
  priceRef = React.createRef();
  frameRef = React.createRef();
  doorsRef = React.createRef();

  createPart = e => {
    e.preventDefault();
    const newPart = {
      name: this.nameRef.current.value,
      size: this.sizeRef.current.value,
      price: this.priceRef.current.value,
      doors: this.frameRef.current.value,
      frame: this.doorsRef.current.value
    };
    console.log(newPart);
  };

  render() {
    return (
      <form className="new-part" onSubmit={this.createPart}>
        <input
          name="name"
          type="text"
          ref={this.nameRef}
          placeholder="Enter name"
          defaultValue="180cm unit"
        />
        <input
          name="size"
          type="text"
          ref={this.sizeRef}
          placeholder="Enter size"
          defaultValue="23x45x65"
        />
        <input
          name="price"
          type="text"
          ref={this.priceRef}
          placeholder="Enter price"
          defaultValue={795}
        />
        <select name="frame" ref={this.frameRef} defaultValue="Glossy Lacquer">
          <option value="Materico">Materico</option>
          <option value="Essenza">Essenza</option>
          <option value="Matte Lacquer">Matte Lacquer</option>
          <option value="Glossy Lacquer">Glossy Lacquer</option>
        </select>
        <select name="doors" ref={this.doorsRef} defaultValue="Essenza">
          <option value="Materico">Materico</option>
          <option value="Essenza">Essenza</option>
          <option value="Matte Lacquer">Matte Lacquer</option>
          <option value="Glossy Lacquer">Glossy Lacquer</option>
        </select>

        <button type="submit">+ Add</button>
      </form>
    );
  }
}

export default RefForm;
