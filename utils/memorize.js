/**
 *  Técnica de memorización para el cacheo de resultados
 * de una función.
 *  Recibe una funcion como parametro para el cual cachea
 * sus resultados, no se vuelve a llamar para el mismo
 * valor.
 *  Como segundo parametro recibe una configuración:
 *    - resolver: procedomiento para obtener una key
 * valida para la imagen de la función.
 *    - primitiveParams: por defecto es true, especifica
 * que los parametros con los que va a trabajar la
 * función son primitivos o no, respectivamente.
 *
 * @param {(n: any) => any} func
 * @param {
 *  {
 *    resolver: (n: any) => any,
 *    primitiveParams: boolean
 *  }
 * } config
 */
function memoize(func, config) {
  const { resolver, primitiveParams } = config;
  if (
    typeof func != 'function' ||
    (resolver != undefined && typeof resolver != 'function')
  ) {
    throw new TypeError('Se esperaba una función como parametro');
  }
  var memoized = function () {
    var args = arguments,
      key = resolver ? resolver.apply(this, args) : args[0],
      cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = !primitiveParams ? new Map() : new WeakMap();
  return memoized;
}
