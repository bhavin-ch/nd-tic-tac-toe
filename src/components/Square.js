import React from 'react';

export default function Square(props) {
  let display = null;
  if (props.value === 1) display = 'X';
  if (props.value === 2) display = '0';
  return (
    <button className="square" onClick={props.onClick}>
      {display}
    </button>
  )
}
