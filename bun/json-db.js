const db = new Proxy(await Bun.file('db.json').json(), {
  set: (o, k, v) => {
    o[k] = v;
    Bun.write('db.json', JSON.stringify(o))
    return true;
  },
  deleteProperty: (o, k) => {
    delete o[k]
    Bun.write('db.json', JSON.stringify(o))
    return true;
  },
})