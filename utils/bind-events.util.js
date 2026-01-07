
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
  const unbinders = [];

  elements.forEach((el) => {
    // if (!(el instanceof Node)) return;
    if (!(el && el.nodeType === 1)) return;

    Object.entries(eventsMap).forEach(([eventName, entry]) => {
      const handler = entry.handler || entry;

      if (typeof handler !== 'function') return;
      
      const options = entry.options || false;

      el.addEventListener(eventName, handler, options);

      unbinders.push(((el, eventName, handler) => {
        return function () {
          el.removeEventListener(eventName, handler);
        };
      })(el, eventName, handler));
    });
  });

  return function unbind() {
    unbinders.forEach((unbinder) => {unbinder();});
  };
}
