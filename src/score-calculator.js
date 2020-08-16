import { isPresent } from "./utils";

let directions = null;

const getReverse = direction => direction.map(d => -1*d);
const getSum = (arr1, arr2) => arr1.map((d, i) => d + arr2[i]);
const getAbs = arr => arr.reduce((x, y) => x + y);
const isCoordInBounds = (gridDepth, coord) => coord.every(c => (c >=0 && c < gridDepth));
const getGridDepth = grid => grid.shape[0];

/**
 * Remove mirror dimensions. Since we'll be checking neighbours in both directions, we don't need to consider mirror opposite of every dimension
 * Eg. we don't need (-1, -1, 0, -1)  if we have (1, 1, 0, 1) already [assuming an n=4 game]
 * Since this is a one time operation per game, I don't care about optimising it
 * @param {array} dirs array containing all possible directions in the grid. This is specific to the grid and needs evaluation only once
 */
const ignoreMirrorDirections = (dirs) => {
  const finalDirs = [];
  for (let dir of dirs) {
    const index = finalDirs.findIndex(f => getSum(f, dir).every(e => e === 0));
    if (index === -1) finalDirs.push(dir);
  }
  return finalDirs;
}

/**
 * Get the list of all possible directions in a grid. This is a property of the grid dependent only on the dimensions
 * It needs to be evaulated only once. Hence we save it as a local variable the first time we need to do calculations and re-use it
 * @param {number} ndims number of dimensions
 */
const setDirections = (ndims) => {
  console.log('calculating directions');
  const base = 3; // for 3 directions 
  const padStr = '0'.repeat(ndims);
  const pad = n => (padStr+n).slice(-ndims); // pad any give number with 0's
  const maxCount = Math.pow(base, ndims);
  let ans = [];
  for (let i=1; i < maxCount; i++) {
    const direction = pad(i.toString(base))
      .split('')
      .map(j => parseInt(j))
      .map(k => k===2 ? -1 : k); // map 2 to -1 (to denote decreasing)
    ans.push(direction);
  }
  const finalAns = ignoreMirrorDirections(ans);
  directions = finalAns;
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
  return (isCoordInBounds(getGridDepth(grid), newCoord)) ? [grid.get(...newCoord), newCoord] : [null, coord];
}

/**
 * Move multiple steps in a given direction, till you encounter a different number
 * @param {NdArray} grid grid as an n dimensional matrix
 * @param {array} coord Coordinate we're calculating for
 * @param {array} direction Coordinate representing direction in each dimension
 * @param {number} value number representing value for next player (ie. who's score to count: O => 1, X => 2)
 * @param {number} dist How far are we from starting point
 */
const _moveMultipleSteps = (grid, coord, direction, value, fwd=true, dist=0) => {
  const [neighbourVal, newCoord] = moveOneStep(grid, coord, direction, fwd);
  if (!isPresent(neighbourVal)) return [coord, dist];
  return neighbourVal === value ? _moveMultipleSteps(grid, newCoord, direction, value, fwd, dist+1) : [coord, dist];
}

/**
 * The coord in question might not be the fist cell in the line. So we first need to move in the oppsite direction
 * @param {NdArray} grid grid as an n dimensional matrix
 * @param {array} coord Coordinate we're calculating for
 * @param {array} direction Coordinate representing direction in each dimension
 * @param {number} value number representing value for next player (ie. who's score to count: O => 1, X => 2)
 * @param {number} dist How far are we from starting point
 */
const fixStart = (grid, coord, direction, value) => {
  return _moveMultipleSteps(grid, coord, direction, value, false, 0);
}
const findEnd = (grid, coord, direction, value) => {
  return _moveMultipleSteps(grid, coord, direction, value, true, 0);
}
const getLineCoords = (grid, start, stop, grad, length) => {
  let ans = new Array(length);
  ans[0] = start;
  ans[length - 1] = stop;
  let currCoord = start;
  for (let i=1; i < length - 1; i++) {
    currCoord = moveOneStep(grid, currCoord, grad)[1]; // last param not needed since we're counting in fwd direction
    ans[i] = currCoord;
  }
  return ans;
}
export const calculateScoreForSquare = (grid, coord, scoreboard, isX, stepNum) => {
  console.log(`calculating the score for ${isX ? 'X' : 'O'}`);
  const val = isX ? 2 : 1;
  const ndims = coord.length;
  const dirs = directions || setDirections(ndims);
  const D = getGridDepth(grid);
  // console.log(dirs.map(d => `(${d.join(',')})`));
  for (const [index, direction] of dirs.entries()) {
    const dirEmojis = ['↓', '·', '↑'];
    // console.log(direction.map(d => dirEmojis[d + 1]).join(' '));
    // console.log(index);
    // console.log(direction);
    const [newStart, dist1] = fixStart(grid, coord, direction, val);
    if (dist1 > 0) console.log(`found a start for (${coord.join(',')}) at (${newStart.join(',')}) in direction (${direction.join(',')}) which is ${dist1} units away`);
    const [end, dist2] = findEnd(grid, coord, direction, val);
    if (dist2 > 0) console.log(`found a end for (${coord.join(',')}) at (${end.join(',')}) in direction (${direction.join(',')}) which is ${dist2} units away`);
    console.log(dist1 + dist2);
    if (dist1 + dist2 === D - 1) {
      console.log('#########################');
      console.log(`found a score for (${coord.join(',')}) at (${newStart.join(',')}) -> (${end.join(',')}) with grad (${direction.join(',')})`);
      console.log('#########################');
      const coords = getLineCoords(grid, newStart, end, direction, D);
      console.log(coords);
      scoreboard.push({ stepNum, isX, coords });
    }
  }
}