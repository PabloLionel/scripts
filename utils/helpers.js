'use strict';

/**
 * Insertar un js dinamicamente
 */
// ((d, t, l, i = null, c = null) => {
//   const s = d.createElement(t),
//     m = d.getElementsByTagName(t)[0];
//   s.setAtstribute('src', l);
//   i && s.setAttribute('integrity', i);
//   c && s.setAttribute('crossorigin', c);
//   m.parentNode.insertBefore(s, m);
// })(
//   document,
//   'script',
//   '//cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js',
//   'sha256-yr4fRk/GU1ehYJPAs8P4JlTgu0Hdsp4ZKrx8bDEDC3I=',
//   'anonymous'
// );

(function (window) {
  var defineSingleEventListener = function (element, event, callback) {
    try {
      if (element.attachEvent) {
        return element.attachEvent('on' + event, callback);
      } else {
        return element.addEventListener(event, callback, false);
      }
    } catch (e) {
      console.error("Couldn't attach event " + event + ' due an error');
    }
  };

  var defineMultipleEventListener = function (elements, event, callback) {
    if (typeof elements === 'Array') {
      elements.forEach(function (entry) {
        this.listener(entry, event, callback);
      });
    } else {
      this.listener(elements, event, callback);
    }
  };

  var isExternal = function (url) {
    var match = url.match(
      /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/
    );
    if (
      typeof match[1] === 'string' &&
      match[1].length > 0 &&
      match[1].toLowerCase() !== location.protocol
    )
      return true;
    if (
      typeof match[2] === 'string' &&
      match[2].length > 0 &&
      match[2].replace(
        new RegExp(
          ':(' + { 'http:': 80, 'https:': 443 }[location.protocol] + ')?$'
        ),
        ''
      ) !== location.host
    )
      return true;
    return false;
  };

  var hashify = function (opts) {
    opts = opts || {};
    opts.body = opts.body || document.body[0];
    opts.root = opts.root || '/';
    opts.titleScheme = opts.titleScheme || 'Navigate to "{link}".';
    opts.target = opts.target || null;
    opts.anchors = opts.anchors || document.getElementsByTagName('a');

    var hashify = function (url) {
      var root = opts.root,
        hasRoot = url.charAt(0) === root,
        hasHash = /^#(.*)/gi.test(url);

      if (hasRoot) {
        if (hasHash) {
          return url;
        } else {
          return '#' + url;
        }
      } else {
        if (hasHash) {
          return '#' + root + url.substring(1);
        } else {
          return '#' + root + url;
        }
      }
    };

    // Update all Links in the body target
    for (var i = 0; i < settings.anchors.length; i++) {
      var anchor = opts.anchors[i],
        target = opts.target,
        scheme = opts.titleScheme;

      var link = anchor.getAttribute('href'),
        content = this.stripHtml(anchor.innerHTML),
        title = scheme.replace('{link}', content);

      anchor.setAttribute('href', hashify(link));
      anchor.setAttribute('title', title);
      anchor.dataset.external = this.link.is.external(link);
      if (opts.target != null) {
        anchor.setAttribute('target', '_' + opts.target);
      }
    }
  };

  var targetingLinks = function (target) {
    var anchors = window.document.getElementsByTagName('a');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].setAttribute('target', target);
    }
  };

  var eachInCollection = function each(obj, fn) {
    if (obj.length) {
      for (
        var i = 0, ol = obj.length, v = obj[0];
        i < ol && fn(v, i) !== false;
        v = obj[++i]
      );
    } else {
      for (var p in obj) {
        if (fn(obj[p], p) === false) break;
      }
    }
  };

  var excerptString = function (str, delimiter) {
    if (str.length > delimiter) {
      var cutted = [],
        i = 0;
      delimiter =
        delimiter == 'undefined' || delimiter == null ? 25 : delimiter;
      while (i < delimiter) {
        cutted.push(str[i]);
        i++;
      }
      return cutted.join('') + '...';
    } else {
      return str;
    }
  };

  var datestamp = function (seperator) {
    var today = new Date(),
      dd = today.getDate(),
      mm = today.getMonth() + 1,
      yyyy = today.getFullYear();
    seperator = seperator != null && seperator.length > 0 ? seperator : '/';
    dd = dd < 10 ? '0' + dd : dd;
    mm = mm < 10 ? '0' + mm : mm;
    return dd + seperator + mm + seperator + yyyy;
  };

  var timestamp = function () {
    var cDate = new Date(),
      dd = cDate.getDate(),
      mm = cDate.getMonth() + 1,
      yyyy = cDate.getFullYear(),
      hh = cDate.getHours(),
      ms = cDate.getMinutes(),
      ss = cDate.getSeconds();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hh < 10) hh = '0' + hh;
    if (ms < 10) ms = '0' + ms;
    if (ss < 10) ss = '0' + ss;

    return dd + '.' + mm + '.' + yyyy + ' ' + hh + ':' + ms + ':' + ss;
  };

  var arrayMapper = function (collection, callback) {
    var mapped = [],
      i = 0,
      abort = false;
    if (typeof callback == 'undefined' || typeof collection == 'undefined')
      abort = true;
    if (!collection instanceof Array) return collection;
    for (i = 0; i < collection.length, !abort; i++) {
      try {
        mapped.push(callback(collection[i]));
      } catch (e) {
        console.error('Map error: ' + e);
        abort = true;
      }
    }
    if (abort) throw 'Mapping aborted due errors!';
    return mapped.length > 1 ? mapped : mapped[0];
  };

  var helper = {
    link: {
      hashify: hashify,
      is: {
        external: isExternal,
        internal: function (url) {
          return !this.external(url);
        },
      },
      target: function (target) {
        return targetingLinks(target);
      },
    },
    dom: {},
    events: {
      listen: defineMultipleEventListener,
    },
    stripHtml: function (content) {
      return content.replace(/(<([^>]+)>)/gi, '');
    },
    each: eachInCollection,
    excerpt: excerptString,
    timestamp: timestamp,
    map: arrayMapper,
    randomInt(max, min = 0) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    reverseStr(str) {
      return str.split('').reverse().join('');
    },
    /**
     *  Recibe un string como primer parametro, y devuelve la sub
     * cadena que coincida con los siguientes parametros.
     * @param {string} str
     * @param {RegExp | string | number} start
     * @param {number} end
     */
    cortarStr(str, start, end) {
      return str.slice(
        ...(start instanceof RegExp || typeof start === 'string'
          ? [0, str.match(start) ? str.match(start).index : str.length]
          : typeof start === 'number'
          ? [start, end || str.length].sort()
          : [0, str.length])
      );
    },
  };

  window._ = helper;
})(window);

// ('0' + n).slice(-2)

/**
 * TypeError: Converting circular structure to JSON
 * @see https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format
 */

// safely handles circular references
JSON.safeStringify = (obj, indent = 2) => {
  let cache = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === 'object' && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
    indent
  );
  cache = null;
  return retVal;
};

// Example:
console.log('options', JSON.safeStringify(options));

/**
 * @see https://medium.com/@mariusc23/send-an-email-using-only-javascript-b53319616782
 */
