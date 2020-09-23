const log = console.log;

/**
 * Media aritmetica
 */
const media = (...args) => {
  let m = 0;
  args.forEach((n) => {
    m += n;
  });
  return m / args.length;
};

/**
 * Esperanza matemática
 */
const esperanza = (...args) => {
  let e = 0;
  args.forEach(([x, p]) => {
    e += x * p;
  });
  return e;
};

/**
 * Varianza aritmetica
 */
const varianza = (...args) => {
  let m = 0;
  args.forEach((n) => {
    m += n;
  });

  m = m / args.length;

  let v = 0;
  args.forEach((n) => {
    v += Math.pow(n - m, 2);
  });

  return v / args.length;
};

/**
 * Desviación típica
 */
const desviacion_tipica = (...args) => {
  let m = 0;
  args.forEach((n) => {
    m += n;
  });

  m = m / args.length;

  let v = 0;
  args.forEach((n) => {
    v += Math.pow(n - m, 2);
  });

  return Math.sqrt(v / args.length);
};

const testChiSquare = (...args) => {
  let e = 0;
  args.forEach(([x, p]) => (e += x * p));

  let chi2 = 0;
  args.forEach(([o]) => (chi2 += Math.pow(o - e, 2)));

  return chi2 / e;
};
/**
 * Test
 */
const ds = [3, 5, 8, 7, 1];

const { random } = Math;

const ds1 = [
  [3, random()],
  [5, random()],
  [8, random()],
  [7, random()],
  [1, random()],
];

//log(media(...ds))
//log(varianza(...ds))
//log(desviacion_tipica(...ds))
//log(esperanza(...ds1))
log(testChiSquare(...ds1));
