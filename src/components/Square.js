import React from 'react';

const areCoordsEqual = (c1, c2) => JSON.stringify(c1) === JSON.stringify(c2);

export default function Square(props) {
  let display = null, bgclass = null;
  if (props.value === 1) { display = 'O'; bgclass = 'bg-success'}
  if (props.value === 2) { display = 'X'; bgclass = 'bg-primary'}
  const isHighlighted = props.highlight.findIndex(c => areCoordsEqual(c, props.coord)) !== -1;
  return (
    <button className={`square ${isHighlighted ? 'bg-warning' : null}`} onClick={props.onClick}>
      <b class="font-weight-bold" className={props.value === 2 ? 'text-primary' : 'text-success'}>{display}</b>
    </button>
  )
}
