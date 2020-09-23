const similarity = (A) => (B) => {
  if (!(typeof B === 'string') || !(typeof A === 'string')) return 0;
  let count = 0;
  for (let i = 0; i < A.length; ++i) {
    if (A[i] === B[i]) {
      count++;
    } else return count;
  }
  return count;
};
const sumSuffixes = (S) => {
  if (!(typeof S === 'string')) return 0;
  const sim = similarity(S);
  return Array.from(S)
    .map((c, i) => sim(S.slice(i, S.length)))
    .reduce((x, y) => x + y, 0);
};
const print = (subtotal) => {
  const li = document.createElement('li');
  li.innerText = subtotal;
  $sample_output.appendChild(li);
};
const main = () => {
  let [t, ...strings] = $sample_input.value.split('\n');
  t = parseInt(t);
  if (isNaN(t)) {
    return;
  }
  $sample_output.innerHTML = '';
  let i = -1;
  while (++i < t) {
    print(sumSuffixes(strings[i]));
  }
};
