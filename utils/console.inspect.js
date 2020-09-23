const typeOf = (o) =>
  ({}.toString
    .call(o)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase());

console.inspect = function (obj) {
  const msg = new Array();
  for (const property in obj) {
    const type = typeOf(obj[property]);

    if (type == 'function') {
      var inicio = obj[property].toString().indexOf('function');
      var fin = obj[property].toString().indexOf(')') + 1;
      var propertyValue = obj[property].toString().substring(inicio, fin);
      msg[msg.length] = {
        type,
        name: property,
        value: propertyValue,
      };
    } else if (type == 'unknown') {
      msg[msg.length] = { type: 'unknown', name: property, value: 'unknown' };
    } else {
      msg[msg.length] = {
        type,
        name: property,
        value: obj[property],
      };
    }
  }
  this.table(msg);
  return msg;
};

class MyClass {
  constructor() {
    this.con = 'propiedades';
  }
  log() {
    console.log(this.con);
  }
}

console.inspect(new MyClass());
