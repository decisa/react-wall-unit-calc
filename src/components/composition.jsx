import React, { Component } from 'react';
import Part from './part';

class Composition extends Component {
  

  render() { 
    const { onDelete, onIncrease, onDecrease } = this.props;
    return ( 
      <div className="composition">
        
          {/* <div className="part-header" style="">Qty</div>
          <div className="part-header">Part Description</div>
          <div className="part-header">Price</div>
          <div className="part-header">Total</div>
          <div className="part-header">&times;</div> */}
        <div className="part-header">
          <div style={{textAlign: 'center'}}>Qty</div>
          <div>Part Description</div>
          <div style={{textAlign: 'right'}}>Price</div>
          <div style={{textAlign: 'right'}}>Total</div>
          <div style={{textAlign: 'center'}}>&times;</div> 
        </div>

        { this.props.parts.map(part => (
            <Part 
              key={ part.id } 
              part={ part } 
              onDelete={ onDelete }
              onIncrease= { onIncrease }
              onDecrease= { onDecrease }
            />
        ))}
      </div>
     );
  }
}
 
export default Composition;