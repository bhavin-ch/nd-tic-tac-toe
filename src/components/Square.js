import React from 'react';

export default function Square(props) {
  let display = null;
  if (props.value === 1) display = 'O';
  if (props.value === 2) display = 'X';
  return (
    <button className="square" onClick={props.onClick}>
      <b class="font-weight-bold" className={props.value === 2 ? 'text-primary' : 'text-success'}>{display}</b>
    </button>
  )
}
