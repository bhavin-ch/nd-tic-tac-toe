import React, { Component } from 'react';

class ScoreBoard extends Component {
  render() {
    return (
      <div className="score-board">
        <h2>Scores</h2>
        <ul>
          {this.props.scoreboard.map(s => {
            return <li>{s.isX ? 'X' : 'O'} Scored</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default ScoreBoard;
