
/**
 * @example
 * const buttons = document.querySelectorAll('.btn');
 *
 * bindEvents(buttons, {
 *   click: (e) => {
 *     console.log('Click en botón', e.target);
 *   },
 *   mouseenter: () => {
 *     console.log('Mouse encima');
 *   }
 * });
 *
 */

function bindEvents(nodes, eventsMap) {
  if (!nodes || !eventsMap || typeof eventsMap !== 'object') {
    return;
  }

  const elements = nodes instanceof Node
    ? [nodes]
    : Array.from(nodes);

  elements.forEach((el) => {
    if (!(el instanceof Node)) return;

    Object.entries(eventsMap).forEach(([eventName, callback]) => {
      if (typeof callback !== 'function') return;

      el.addEventListener(eventName, callback);
    });
  });
}
