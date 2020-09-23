/**
 *  Basado en el método range de python.
 *  - range(stop)
 *  - range(start, stop[, step])
 * @see https://docs.python.org/3/library/functions.html#func-range
 */
function* range(start, stop, step) {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }
  if (typeof step == 'undefined') {
    step = 1;
  }
  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    yield;
  }
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i;
  }
}

console.log(...range(5)); // 0 1 2 3 4
console.log(...range(5, 0)); // undefined
console.log(...range(5, 0, -1)); // 5 4 3 2 1

Number.prototype[Symbol.iterator] = function* () {
  for (let i = 0; i < this; ++i) yield i;
};

console.log(...5);
