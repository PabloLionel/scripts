/**
 * @decorator
 * Attach events to DOM element
 *
 * @param {Element|Function} elemOrFunc: DOM Element, or a function returns element
 * @param {String} events: a list events separated with ','
 *
 * Usage:
 *   @attachEvents(window, 'click')
 *   handleWindowClick(evt) {
 *     ...
 *   }
 *
 *   @attachEvents(document, 'mousedown, touchstart')
 *   handlePointerDown(evt) {
 *     ...
 *   }
 *
 *   @attachEvents(function getElem() { return this.refs.elem; }, 'click')
 *   handleClickOnElem(evt) {
 *     ...
 *   }
 * @see https://gist.github.com/idiotWu/76824adb9159efdc2afa2281d8a02fa2
 */
const noop = () => {};
function attachEvents(elemOrFunc, events) {
  const eventList = events.split(/\s*,\s*/);
  const getElem =
    typeof elemOrFunc === 'function' ? elemOrFunc : () => elemOrFunc;

  return function decorator(proto, method, descriptor) {
    const { componentDidMount = noop, componentWillUnmount = noop } = proto;

    const symbolHandler = Symbol(method);

    function addListener() {
      const elem = getElem.call(this);

      const handler = (this[symbolHandler] = (...args) => {
        descriptor.value.apply(this, args);
      });

      eventList.forEach((evt) => {
        elem.addEventListener(evt, handler);
      });
    }

    function removeListener() {
      const elem = getElem.call(this);

      eventList.forEach((evt) => {
        elem.removeEventListener(evt, this[symbolHandler]);
      });
    }

    // eslint-disable-next-line no-param-reassign
    proto.componentDidMount = function componentDidMountWrapped() {
      componentDidMount.call(this);

      addListener.call(this);
    };

    // eslint-disable-next-line no-param-reassign
    proto.componentWillUnmount = function componentWillUnmountWrapped() {
      componentWillUnmount.call(this);

      removeListener.call(this);
    };
  };
}
