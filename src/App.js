import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Composition from './components/composition';
import Form from './components/form'

class App extends Component {
  state = {
    parts: [
      { id: 0, qty: 1, price: 300},
      { id: 1, qty: 2, price: 250},
      { id: 2, qty: 1, price: 985},
      { id: 3, qty: 1, price: 474}
    ],

    nextId: 4
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

  handleAddNewPart = (info) => {
    console.log(info);
    const parts = [...this.state.parts];
    const newEntry = Object.assign({ id : this.state.nextId, qty: 1}, info, { price: parseInt(info.price) });
    console.log(newEntry);
    parts.push(newEntry);
    this.setState({ parts, nextId: this.state.nextId + 1});

  }


  render() {
    return (
      <main>
        <Composition 
          onDelete={ this.handleDelete }
          onIncrease={ this.handleQtyIncrease }
          onDecrease={ this.handleQtyDecrease }
          parts={ this.state.parts } 
        />
        <Form addNewPart={ this.handleAddNewPart } />
      </main>
    );
  }
}

export default App;
