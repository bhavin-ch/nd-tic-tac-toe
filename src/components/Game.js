import React, { Component } from 'react';
import Board from './Board';
import * as nj from 'numjs';
import { calculateScoreForSquare } from '../score-calculator';
import ScoreBoard from './ScoreBoard';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xNext: true,
      stepNum: 0,
      history: [nj.zeros([3,3,3,3], 'uint8')],
      scoreboard: []
    }
  }
  handleClick (coords) {
    const currLen = this.state.history.length - 1;
    // console.log('currLen');
    // console.log(currLen);
    let newState = this.state.history[currLen];
    newState.set(...coords, this.state.xNext ? 2 : 1);
    // console.log(`value at ${coords}`);
    // console.log(newState.get(...coords));
    // console.log(this.state.xNext);
    calculateScoreForSquare(newState, coords, this.state.scoreboard, this.state.xNext, currLen + 1);
    console.log('scoreboard length', this.state.scoreboard.length);
    this.setState({
      history: this.state.history.concat(newState),
      xNext: !this.state.xNext,
      stepNum: currLen + 1,
    });
    // console.log('this.state');
    // console.log(this.state);
  }
  render() {
    // console.log(this.state);
    const history = this.state.history;
    const current = history[history.length - 1];
    return (
      <div className="game">
        <Board onClick={(coords) => this.handleClick(coords)} state={current} />
        <ScoreBoard scoreboard={this.state.scoreboard}></ScoreBoard>
      </div>
    );
  }
}

export default Game;
