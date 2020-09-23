/**
 * sort random array
 */
Array.prototype.shuffle = function () {
  const i = this.length;
  let j, temp;
  if (i == 0) return this;
  console.log(i);
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};

console.log([1, 2, 3, 4, 5, 6, 7].shuffle());
