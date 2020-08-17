import React, { Component } from 'react';

class ScoreBoard extends Component {
  reverseArray = arr => arr.map((val, index, array) => array[array.length - 1 - index]);
  getScore(player) {
    const count = this.props.scoreboard.map(s => s.count);
    const scores = this.props.scoreboard.filter(s => player === 'X' ? s.isX : !s.isX );
    console.log(`$$$$$$$$$$$$ count for ${player}`);
    console.log(count);
    console.log(scores);
    return this.props.scoreboard
      .filter(s => player === 'X' ? s.isX : !s.isX)
      .map(s => s.count)
      .reduce((x,y) => x+y, 0);
  }
  render() {
    const scoreboard = this.props.scoreboard;
    return (
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="sidebar-heading">NxD Tic Tac Toe</div>
        <div class="list-group list-group-flush">
          <a href="#" class="list-group-item list-group-item-action bg-light">
            <span className={this.props.xNext ? 'text-primary' : 'text-success'}><b>Next turn: {this.props.xNext ? 'X':'O'}</b></span>
          </a>
        </div>
        <div class="list-group list-group-flush">
          <span href="#" class="list-group-item list-group-item-action bg-light"><h6>Scores</h6></span>
          <div class="score-rows">
            <a href="#" class="list-group-item list-group-item-action bg-light row score-row">
              <div class="col text-primary">X</div>
              <div class="col text-primary">{this.getScore('X')}</div>
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-light row score-row">
              <div class="col text-success">O</div>
              <div class="col text-success">{this.getScore('O')}</div>
            </a>
          </div>
        </div>
        <div class="list-group list-group-flush">
          <span href="#" class="list-group-item list-group-item-action bg-light"><h6>Events</h6></span>
          <div class="score-rows">
            {scoreboard.reverse().map(s => {
              return (
                <a href="#" class="list-group-item list-group-item-action bg-light row score-row">
                  <div class="col" style={{fontSize: 'small', margin: 'inherit'}}>STEP {s.stepNum}</div>
                  <div class="col">{s.isX ? 'X' : 'O'}</div>
                  <div class="col" className={s.isX ? 'text-primary' : 'text-success'}>{s.count} points</div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ScoreBoard;
