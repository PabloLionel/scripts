function concatArray() {
  const len = arguments.length;
  if (len) {
    for (let i = 1; i < len; ++i) {
      Array.prototype.push.apply(arguments[0], arguments[i]);
    }
  }
}

arr1 = [1, 2, 3];
console.log(arr1);
arr2 = [4, 5, 6];
arr3 = [7, 8, 9];
arr4 = [10, 11, 12];
concatArray(arr1, arr2, arr3, arr4);

console.log(arr1);
