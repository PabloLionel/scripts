/**
 *
 * @param {string} word1
 * @param {string} word2
 */
const distance = (word1) => (word2) => {
  if (typeof word1 !== 'string') return 0;
  if (typeof word2 !== 'string') return 0;
  word1 = word1.trim().replace(/\s{2,}/g, ' ');
  word2 = word2.trim().replace(/\s{2,}/g, ' ');
  if (!word1) return 0;
  if (!word2) return 0;

  let w1, w2;

  if (word1.length > word2.length) {
    w1 = word2;
    w2 = word1;
  } else {
    w1 = word1;
    w2 = word2;
  }

  return Array.prototype.reduce.call(w1, (x, y, i) => x + ~~(y !== w2[i]), 0);
};

console.log(distance('jeje')('jaja'));
