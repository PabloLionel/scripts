/**
 *  Equivalente a typeof pero más avanzado.
 * @example
 *  typeOf(); //undefined
 *  typeOf(null); //null
 *  typeOf(NaN); //number
 *  typeOf(5); //number
 *  typeOf({}); //object
 *  typeOf([]); //array
 *  typeOf(''); //string
 *  typeOf(function() {}); //function
 *  typeOf(/a/); //regexp
 *  typeOf(new Date()); //date
 *  typeOf(new Error()); //error
 *  typeOf(Promise.resolve()); //promise
 *  typeOf(function*() {}); //generatorfunction
 *  typeOf(new WeakMap()); //weakmap
 *  typeOf(new Map()); //map
 *
 * @param {any} o
 */
const typeOf = (o) =>
  ({}.toString
    .call(o)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase());

console.log(typeOf()); //undefined
console.log(typeOf(null)); //null
console.log(typeOf(NaN)); //number
console.log(typeOf(5)); //number
console.log(typeOf({})); //object
console.log(typeOf([])); //array
console.log(typeOf('')); //string
console.log(typeOf(function () {})); //function
console.log(typeOf(/a/)); //regexp
console.log(typeOf(new Date())); //date
console.log(typeOf(new Error())); //error
console.log(typeOf(Promise.resolve())); //promise
console.log(typeOf(function* () {})); //generatorfunction
console.log(typeOf(new WeakMap())); //weakmap
console.log(typeOf(new Map())); //map
