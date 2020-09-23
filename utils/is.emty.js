/**
 * Si un el valor pasado por parametro es
 * vacio retorna verdadero
 * @param {any} value
 * @returns {boolean}
 */
function isEmty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
}
