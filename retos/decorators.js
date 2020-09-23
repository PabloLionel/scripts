// const time = (target, key, descriptor) => {
//     const fn = descriptor.value.bind(target)
//     let i = 0
//     descriptor.value = (...args) => {
//         let id = ++i
//         console.time(key + id)
//         let value = fn(...args)
//         console.timeEnd(key + id)
//         return value
//     }
// }
function timer(target, name, descriptor) {
  // create a reference to the function
  let fn = descriptor.value;
  // modify!
  descriptor.value = function () {
    console.time(name);
    let result = fn.apply(this, arguments);
    console.timeEnd(name);
  };
  // apply on property
  Object.defineProperty(target, name, descriptor);
}
const memorize = (target, key, descriptor) => {
  const fn = descriptor.value.bind(target);
  const prevs = {};
  descriptor.value = (...args) => {
    if (prevs[args.toString()]) return prevs[args.toString()];
    prevs[args.toString()] = fn(...args);
  };
};
function enumerable(value) {
  return function (target, propertyKey, descriptor) {
    descriptor.enumerable = value;
  };
}
class Tools {
  // @ts-ignore
  // @time
  isPrime(n) {
    let i = n;
    while (i && n % --i);
    return i;
  }
}

const p = new Person('Edgar Bermejo');
console.log(p.greeting()); // Hi! I'm Edgar Bermejo . Nice to meet you!
p.grow(99);
// class Fns {
//     @time
//     fib(n) {
//         if (n <= 0) return 0
//         if (n === 1) return 1
//         return this.fib(n-1) + this.fib(n-2)
//     }
// }
// const fns = new Fns()
// console.log(fns.fib(10))
