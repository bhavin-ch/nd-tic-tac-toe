import React, { Component } from 'react';
import Board from './Board';
import * as nj from 'numjs';
import { calculateForSquare } from '../score-calculator';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xNext: true,
      stepNum: 0,
      history: [nj.zeros([3,3,3,3], 'uint8')]
    }
  }
  handleClick (coords) {
    const currLen = this.state.history.length - 1;
    console.log('currLen');
    console.log(currLen);
    let newState = this.state.history[currLen];
    newState.set(...coords, this.state.xNext ? 2 : 1);
    console.log(`value at ${coords}`);
    console.log(newState.get(...coords));
    calculateForSquare(newState, coords, this.state.xNext);
    this.setState({
      history: this.state.history.concat(newState),
      xNext: !this.state.xNext,
      stepNum: currLen + 1,
    });
    console.log('this.state');
    console.log(this.state);
  }
  render() {
    console.log(this.state);
    const history = this.state.history;
    const current = history[history.length - 1];
    return (
      <div className="game">
        <Board onClick={(coords) => this.handleClick(coords)} state={current} />
      </div>
    );
  }
}

export default Game;
