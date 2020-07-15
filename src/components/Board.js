import React, { Component } from 'react';
import Square from './Square';
import Grid from './Grid';

const setCoords = (coords, indices) => {
  const index = coords.findIndex(c => c === -1);
  if (index === -1) return coords;
  const ans = [...coords];
  ans[index] = indices[0];
  if (indices.length === 2) ans[index + 1] = indices[1];
  return ans;
}
const getKey = coords => `(${coords.join(',')})`;
const isLeaf = coords => (coords.findIndex(c => c === -1) === -1)

class Board extends Component {

  render() {
    const shape = this.props.state.shape;
    const coords = shape.map(x => -1);
    const builder = (coords) => {
      const isSingle = (coords.every(e => e === -1) && coords.length%2 === 1);
      return <Grid isSingle={isSingle} state={this.props.state} key={getKey(coords)} child={(i, j) => {
        const newCoords = setCoords(coords, isSingle ? [i] : [i, j]);
        return isLeaf(newCoords) ? 
        <Square value={this.props.state.get(...newCoords)} key={getKey(newCoords)} onClick={() => this.props.onClick(newCoords)}/>
        :
        builder(newCoords);
      }}/>
    }
    return builder(coords);
  }
}

export default Board;