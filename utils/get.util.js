/**
 * @property {object} object - The object to query
 * @property {string} path - The path of the property to get. @example Parsear path: "user.email[0]" → ["user", "email", "0"]
 * @property {object} defaultValue - The default value to return if no value found in path
 * @returns {*} Returns the resolved value (undefined / fallback value / value found).
 */
function get(obj, path, defaultValue) {
    if (!obj || !path) {
      return defaultValue as T;
    }
  
    const keys = path
      .replace(/\[/g, '.')
      .replace(/\]/g, '')
      .split('.')
      .filter(k => k.length > 0);

    let current = obj;

    for (const key of keys) {
      if (current === null || current === undefined) break;

      current = current[key];
    }

    return current === undefined ? defaultValue : current;
}
