import React, { Component } from 'react';
import Board from './Board';
import * as nj from 'numjs';
import { calculateScoreForSquare } from '../score-calculator';
import ScoreBoard from './ScoreBoard';

class Game extends Component {
  constructor(props) {
    super(props);
    this.highlight = [];
    this.onMouseDown = this.highlightScore.bind(this);
    this.onMouseUp = this.unHighlightScore.bind(this);
    this.state = {
      xNext: true,
      stepNum: 0,
      // history: [nj.zeros([3,3,3,3], 'uint8')],
      history: [nj.zeros(this.props.boardParams, 'uint8')],
      scoreboard: []
    };
    this.params = this.props.boardParams;
    this.gameUpdated = false;
  }
  highlightScore(score) {
    console.log('score.coords');
    console.log(score.coords);
    // this.highlight.push(...score.coords)
    // this.highlight = [].concat.apply([], score.coords);
    let coords = []
    for (let line of score.coords) {
      console.log(line);
      for (let coord of line) {
        console.log(coord);
        coords.push(coord)
      }
    }
    if (coords.length !== 0) {
      this.highlight = coords;
      console.log(this.highlight);
      this.forceUpdate();
    }
  }
  unHighlightScore() {
    this.highlight = [];
    this.forceUpdate()
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
    const params = this.props.boardParams;
    console.log('~~~~~~~~~params');
    console.log(params);
    if (!this.gameUpdated) {
      if (this.params[0] !== params[0] || this.params.length !== params.length) {
        this.setState({
          history: [nj.zeros(params, 'uint8')]
        });
        this.gameUpdated = true;
      }
    }
    return (
      // <div className="game">
      <div class="d-flex sidebar-wrapper" id="wrapper">
        <ScoreBoard scoreboard={this.state.scoreboard}
          xNext={this.state.xNext} highlight={this.highlight}
          onMouseUp={this.onMouseUp} onMouseDown={this.onMouseDown} />
        <div className="grid-wrapper">
          <Board onClick={(coords) => this.handleClick(coords)} state={current} highlight={this.highlight}/>
          {/* <span>highlight</span>
          <span>{this.highlight}</span> */}
        </div>
      </div>
    );
  }
}

export default Game;
