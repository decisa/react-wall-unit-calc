import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Composition from './components/composition';

class App extends Component {
  state = {
    parts: [
      { id: 0, qty: 1, price: 300},
      { id: 1, qty: 2, price: 250},
      { id: 2, qty: 1, price: 985},
      { id: 3, qty: 1, price: 474}
    ]
  };

  handleQtyIncrease = (part) => {
    const parts = [...this.state.parts];
    const ind = parts.indexOf(part);
    parts[ind] = { ...part };
    parts[ind].qty += 1;
    this.setState({ parts });
  }

  handleQtyDecrease = (part) => {
    const parts = [...this.state.parts];
    const ind = parts.indexOf(part);
    parts[ind] = { ...part };
    parts[ind].qty -= 1;
    this.setState({ parts });
  }

  handleDelete = (id) => {
    console.log('trying to delete ', id);
    const parts = this.state.parts.filter(part => part.id !== id);
    this.setState({ parts });
  }


  render() {
    return (

      <Composition 
        onDelete={ this.handleDelete }
        onIncrease={ this.handleQtyIncrease }
        onDecrease={ this.handleQtyDecrease }
        parts={ this.state.parts } 
      />
      
    );
  }
}

export default App;
