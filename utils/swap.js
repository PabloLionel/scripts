/**
 * Swap two elements in parent
 *
 * @param {HTMLElement} el1 - from
 * @param {HTMLElement} el2 - to
 * @deprecated
 */
function swap(el1, el2) {
  // create marker element and insert it where el1 is
  const temp = document.createElement('div'),
      parent = el1.parentNode;

  parent.insertBefore(temp, el1);

  // move el1 to right before el2
  parent.insertBefore(el1, el2);

  // move el2 to right before where el1 used to be
  parent.insertBefore(el2, temp);

  // remove temporary marker node
  parent.removeChild(temp);
}