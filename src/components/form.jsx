import React, { Component } from 'react';

class Form extends Component {
  state = { 
    name: '',
    price: 0,
    frame: 'materico',
    fronts: 'matte lacquer'
   }

   onChange = (e) => {
     this.setState({ [e.target.name]: e.target.value });
   }

   submitForm = (e) => {
     e.preventDefault();
     this.props.addNewPart({ ...this.state });
   }

  render() { 
    return ( 
      <form onSubmit={ this.submitForm } >
        <label>Part name</label><br />
        <input 
          type="text" 
          name="name" 
          placeholder="Product Name" 
          value={ this.state.name }
          onChange={ this.onChange }
        /><br />
        <label>Price</label><br />
        <input 
          type="number" 
          name="price"
          value={ this.state.price }
          onChange={ this.onChange }
        /><br />
        <label>Frame</label><br />
        <input 
          type="text" 
          name="frame" 
          placeholder="Frame material" 
          value={ this.state.frame }
          onChange={ this.onChange }
        /><br />
        <label>Part name</label><br />
        <input 
          type="text" 
          name="fronts" 
          placeholder="Product fronts material" 
          value={ this.state.fronts }
          onChange={ this.onChange }
        /><br />
        <button >Add</button>
      </form>
     );
  }
}
 
export default Form;