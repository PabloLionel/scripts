const { join } = require('path');
const { writeFileSync } = require('fs');

const DB_PATH = join(__dirname, '/../json/db.json');
const db = require(DB_PATH);

exports.Db = class {
  /**
   * Pasa los cambios hechos en memoria al storage.
   */
  async commit() {
    writeFileSync(DB_PATH, JSON.stringify(db));
    return this;
  }
  /**
   * @param {number | string} _id
   */
  async getById(_id) {
    return _id ? db.find(({ id }) => id == _id) : db;
  }
  /**
   * @param {any} item
   */
  async add(item) {
    const n = db.length;
    item.id = n === 0 ? 0 : db[n - 1].id + 1;
    db.push(item);
    return await this.commit();
  }
  /**
   * actualiza las propiedades de un item segun su id.
   * si el parametro `replace` es verdadero lo remplaza.
   * @param {number | string} _id
   * @param {any} item
   * @param {boolean} replace (default: false)
   */
  async update(_id, item, replace = false) {
    if (!_id) {
      throw new Error('Param id is empty.');
    }
    const index = db.findIndex(({ id }) => id == _id);
    db[index] = replace ? item : Object.assign({}, db[index]);
    return await this.commit();
  }
  /**
   * @param {number | string} _id
   */
  async delete(_id) {
    if (!_id) {
      throw new Error('Param id is empty.');
    }
    const index = db.findIndex(({ id }) => id == _id);
    db.splice(index, 1);
    return await this.commit();
  }
};
