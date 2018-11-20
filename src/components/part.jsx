import React, { Component } from 'react';
import Quantity from './quantity';
import Price from './price';


class Part extends Component {
  state = { 
    name: this.props.part.name || '180cm cabinet',
    options: {
      price: this.props.part.price,
      frame: this.props.part.frame || 'materico',
      fronts: this.props.part.fronts || 'matte lacquer'
    },
  }

  deletePart = () => {
    this.props.onDelete(this.props.part.id);
  }

  render() { 
    const partOptions = Object.entries(this.state.options).map(([key, value]) => (
        <React.Fragment  key={ key }>
          <div className="part-option-name">{ key }</div>
          {/* <div>:</div> */}
          <div>{ value }</div> 
        </React.Fragment>
    ));

    return ( 
      <div className="part-container">
        <Quantity
          part={ this.props.part } 
          onIncrease={ this.props.onIncrease }
          onDecrease={ this.props.onDecrease }
        />
        <div className="part-description">
          <h3>{ this.state.name }</h3>
          <div className="part-options">
            { partOptions }
          </div>
        </div>
        <Price price={ this.state.options.price } qty={ 1 } />
        <Price price={ this.state.options.price } qty={ this.props.part.qty } />
        <button style={{justifySelf: 'center'}} className='button button-red button-square' onClick={ this.deletePart } >&times;</button>
      </div>  
    );
  }
}
 
export default Part;