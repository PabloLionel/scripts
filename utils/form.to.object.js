/**
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool}             true if the element is an input, false if not
 */
const isValidElement = (element) => {
  return element.name && element.value;
};
/**
 * Checks if an element’s value can be saved (e.g. not an unselected checkbox).
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the value should be added, false if not
 */
const isValidValue = (element) => {
  return !['checkbox', 'radio'].includes(element.type) || element.checked;
};
/**
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool}             true if the element is an input, false if not
 */
const isValidName = (element) => {
  return element.name && element.name.trim().length;
};
/**
 * Checks if an input is a checkbox, because checkboxes allow multiple values.
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the element is a checkbox, false if not
 */
const isCheckbox = (element) => element.type === 'checkbox';
/**
 * Checks if an input is a radio button element.
 * @param  {Element} element  the element to check radio
 * @return {Boolean}          true if the element is a radio button, false if not
 */
const isRadio = (element) => element.type === 'radio';
/**
 * Checks if an input is a `select` with the `multiple` attribute.
 * @param  {Element} element  the element to check
 * @return {Boolean}          true if the element is a multiselect, false if not
 */
const isMultiSelect = (element) => element.options && element.multiple;
/**
 * Retrieves the selected options from a multi-select as an array.
 * @param  {HTMLOptionsCollection} options  the options for the select
 * @return {Array}                          an array of selected option values
 */
const getSelectValues = (options) =>
  [].reduce.call(
    options,
    (values, option) => {
      return option.selected ? values.concat(option.value) : values;
    },
    []
  );
/**
 * Retrieves input data from a form and returns it as a object.
 * @example const obj = formToObject(myFotm.elements)
 * @param  {HTMLFormControlsCollection} elements  the form elements (ej. document.forms[0].elements)
 * @param  {boolean} strictExtraction             validate the dom element and its value
 * @return {Object}                               form data as an object literal
 */
const formToObject = ({ elements }, strictExtraction = false) =>
  Array.prototype.reduce.call(
    elements,
    (data, element) => {
      if (
        isValidName(element) &&
        (!strictExtraction ||
          (isValidElement(element) && isValidValue(element)))
      ) {
        if (isCheckbox(element)) {
          data[element.name.trim()] = (data[element.name] || []).concat(
            element.value
          );
        } else if (isRadio(element)) {
          element.checked && (data[element.name.trim()] = element.value);
        } else if (isMultiSelect(element)) {
          data[element.name.trim()] = getSelectValues(element);
        } else {
          data[element.name.trim()] = element.value;
        }
      }
      return data;
    },
    {}
  );

/**
 * @example
 */
(() => {
  const app = document.getElementById('app');
  app.innerHTML = `
  <form>
    <input type="text" name="nombre" />
    <input type="date" name="nacimiento" />
    <input type="number" name="altura" />
    <select name="sexo">
      <option value="M">Hombre</option>
      <option value="F">Mujer</option>
    </select>
    <div>
      <input type="radio" name="contact" value="email" checked>
      <label for="contactChoice1">Email</label>

      <input type="radio" name="contact" value="phone">
      <label for="contactChoice2">Phone</label>

      <input type="radio" name="contact" value="mail">
      <label for="contactChoice3">Mail</label>
    </div>
    <label>si</label>                      
    <input type="radio" name="ejemplo" value="true" />
    <label>no</label>
    <input type="radio" name="ejemplo" value="false" />
    <input type="submit" value="Ejecutar Ejemplo" />
    
  </form>`;
  const form = document.querySelector('#app>form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(formToObject(e.target));
  });
})();
