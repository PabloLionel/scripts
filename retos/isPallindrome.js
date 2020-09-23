function isPalindrome(word) {
  const _word = word.toLowerCase();
  const n = word.length;
  const middle = ~~(n / 2) + (n % 2);
  let isPalindrome = true;
  for (let i = 0; i < middle; ++i) {
    if (_word[i] !== _word[n - (i + 1)]) {
      isPalindrome = false;
      break;
    }
  }
  return isPalindrome;
}
