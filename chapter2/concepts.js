// HOF = Functions that fake a function as a parameter, and return an enhanced function
// with special behaviours
const add = (x, y) => x + y;

const log =
  (fn) =>
  (...args) => {
    return fn(...args);
  };

const logAdd = log(add);
