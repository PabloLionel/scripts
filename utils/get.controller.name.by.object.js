/**
 * @property {object} object - The object to query
 * @property {string} path - The path of the property to get
 * @property {object} fallback - The default value to return if no value found in path
 * @returns {*} Returns the resolved value (undefined / fallback value / value found).
 */
function get(object, path, fallback) {
    const dot = path.indexOf('.');

    if (object === undefined) {
        return fallback || undefined;
    }

    if (dot === -1) {
        if (path.length && path in object) {
            return object[path];
        }

        return fallback;
    }

    return get(object[path.substr(0, dot)], path.substr(dot + 1), fallback);
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

const getControllerName = (target, typeToRemove, modeCase) => {
    if (!target) {
        return '';
    }
    const name = get(target, 'name', target);
    const base = typeToRemove ? name.replace(typeToRemove, '') : name;
    switch (modeCase) {
        case 'lower':
            return base.toLowerCase();
        case 'upper':
            return base.toLowerCase();
        case 'camel':
            return camelize(base);
        default:
            return base;
    }
};
