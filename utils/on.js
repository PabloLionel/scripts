/**
 * Escucha un evento pasado por parametro a una lista de componentes filtrados
 * por un selector, si el componente tiene dicho selector se aplica el Callback
 * que se pasa por parametro.
 * @author Iván Abascal Lozano
 * @param {list} list - Elemento (HTMLElement) sobre el que
 * se aplica el evento.
 * @param {event} event - string del evento a escuchar.
 * @param {selector} selector - selector filtro
 * @param {fn} fn - callback
 * @see https://abalozz.es/optimiza-el-manejo-de-eventos-del-dom-en-javascript/
 *
 * @example
 *  // html
 *  <ul>
 *    <li class="unSelector">item</li>
 *    <li class="unSelector">item</li>
 *    <li class="unSelector">item</li>
 *    <li class="unSelector">item</li>
 *    <li class="unSelector">item</li>
 *    <li class="unSelector">item</li>
 *  </ul>
 *  // js
 *  Array.prototype.forEach.call(document.getElementsByTagName('li'), (el, i) => {
 *    on(
 *      el,
 *      'mouseover',
 *      'unSelector',
 *      () =>
 *        (el.style.backgroundColor =
 *          el.style.backgroundColor === 'white' ? '' : 'white')
 *    );
 *  });
 */
const on = (list, event, selector, fn) => {
  list.addEventListener(event, (e) => {
    const inner = (el) => {
      if (el !== this) {
        if (el.classList.contains(selector)) {
          return el;
        }
        return inner(el.parentNode);
      }
      return false;
    };
    const el = inner(e.target);
    if (el !== false) fn.call(this, e);
  });
};
