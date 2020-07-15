import React, { Component } from 'react';

const isPresent = (variable) => (variable != null && typeof variable !== 'undefined');
class Grid extends Component {
  constructor(props) {
    super(props);
    this.isSingle = isPresent(props.isSingle) ? props.isSingle : false;

  }
  render() {
    const shape = this.props.state.shape;
    const counter = new Array(shape[0]).fill(null);
    return this.isSingle ? (
      <div className="grid">
        <div className="border-row in-row">
            {counter.map((_, i) => this.props.child(i,0))}
          </div>
      </div>
    ) : (
      <div className="grid">
        {counter.map((_, i) => (
          <div className="border-row in-row" key={i.toString()}>
            {counter.map((_, j) => this.props.child(i,j))}
          </div>
        ))}
      </div>
    );
  }
}

export default Grid;
