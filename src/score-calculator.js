let directions = null;

const setDirections = (ndims) => {
  console.log('calculating directions');
  const base = 3; // for 3 directions 
  const padStr = '0'.repeat(ndims);
  const pad = n => (padStr+n).slice(-ndims); // pad any give number with 0's
  const maxCount = Math.pow(base, ndims);
  let ans = [];
  for (let i=1; i < maxCount; i++) {
    const direction = pad(i.toString(base)).split('').map(j => parseInt(j)).map(k => k===2 ? -1 : k);
    ans.push(direction);
  }
  directions = ans;
  return directions;
}

/**
 * Move a single step in the give direction
 * @param {NdArray} grid grid as an n dimensional matrix
 * @param {array} coord Coordinate we're calculating for
 * @param {array} grad Coordinate representing direction in each dimension (ie gradient)
 * @param {boolean} fwd boolean flag indicating whether to go up or down the gradient
 */
const moveOneStep = (grid, coord, grad, fwd=true) => {
  const dirMultiplier = fwd ? 1 : -1;
  const newCoord = coord.map((c, i) => c + dirMultiplier*grad[i]);
  // console.log(newCoord);
  return [grid.get(...newCoord), newCoord];
}

/**
 * The coord in question might not be the fist cell in the line. So we first need to move in the oppsite direction
 * @param {NdArray} grid grid as an n dimensional matrix
 * @param {array} coord Coordinate we're calculating for
 * @param {array} direction Coordinate representing direction in each dimension
 * @param {number} value number representing value for next player (ie. who's score to count: O => 1, X => 2)
 * @param {number} dist How far are we from starting point
 */
const fixStart = (grid, coord, direction, value, dist=0) => {
  const [oppNeighbour, newCoord] = moveOneStep(grid, coord, direction, false);
  return oppNeighbour === value ? fixStart(grid, newCoord, direction, value, dist+1) : [coord, dist];
}

export const calculateForSquare = async (grid, coord, xNext) => {
  console.log(`calculating the score for ${xNext ? 'X' : 'O'}`);
  const val = xNext ? 2 : 1;
  const ndims = coord.length;
  console.log(ndims);
  const dirs = directions || setDirections(ndims, true);
  console.log(dirs.map(d => `(${d.join(',')})`));
  for (const [index, direction] of dirs.entries()) {
    const dirEmojis = ['↓', '·', '↑'];
    console.log(direction.map(d => dirEmojis[d + 1]).join(' '));
    console.log(index);
    console.log(direction);
    // fixStart(grid, coord, direction, val);
    // const [newStart, dist] = fixStart(grid, coord, direction, val, 0);
    // console.log(`found a start for (${coord.join(',')}) at (${newStart.join(',')}) which is ${dist} units away`);
  }
}