// HOF = Functions that fake a function as a parameter, and return an enhanced function
// with special behaviours
const add = (x, y) => x + y;

const log =
  (fn) =>
  (...args) => {
    return fn(...args);
  };

const logAdd = log(add);

// Pure functions have no side effects, dont change anything that is not local to itself
const pureAddFunction = (x, y) => x + y;

// Impure functions are harder to debug
let x = 0;
const impureAddFunction = (y) => (x = x + y); // will change x value, that is an outsider

// Immutability

// This one doesnt follow immutability
const add3 = (arr) => arr.push(3);
const myArr = [1, 2];
add3(myArr); // [1, 2, 3]
add3(myArr); // [1, 2, 3, 3]

// With contact it will follow immutability
// After we have run the function twice, myArr2 still has its original value.
const add3Contact = (arr) => arr.concat(3);
const myArr2 = [1, 2];
const result1 = add3Contact(myArr2); // [1, 2, 3]
const result2 = add3Contact(myArr2); // [1, 2, 3]

// Currying convert a function that takes multiple arguments into a function into
// a function with one argument at time and returning another function
// the first value is stored
// after the application of the first parameter, we
//  can reuse the second function multiple times.

// const addNoCurrying = (x, y) => x + y
const addCurrying = (x = (y) => x + y);

const add1 = addCurrying(1);
const resultAdd1 = add1(2); // 3
const resultAdd2 = add1(3); // 4
