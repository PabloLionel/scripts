const cmp = (T, s, i) => {
  let eq = 1;
  Array
    .from(s)
    .forEach((c, j) => {
      if (T[i + j] != c) {
        eq = 0;
        return;
      }
    });
  return eq;
}
const occurrences = T => s => {
  let oc = 0; // ocurrencias
  for (let i = 0; i < T.length; i++) {
    oc += cmp(T, s, i);
  }
  return s.length * oc;
};
const f = S => {
  return Math.max(
    ...Array
      .from(S)
      .map((_, i) => occurrences(S)(S.slice(0,i + 1)))
    // ...Array.prototype.reduce.call(
    //   S,
    //   (acc, _, i, T) => acc.concat([occurrences(T)(T.slice(0,i + 1))]),
    //   []
    // )
  );
}
console.clear();
console.log('aaaaaa: ', f('aaaaaa'));
console.log('abcabcddd: ', f('abcabcddd'));
