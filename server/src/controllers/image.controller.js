const { db } = require('../utils');

/**
 * @interface IFile
 * @property {string} fieldname
 * @property {string} originalname
 * @property {string} encoding
 * @property {string} mimetype
 * @property {string} destination
 * @property {string} filename
 * @property {string} path
 * @property {number} size
 */

/**
 * @extends IFile
 * @interface IFileById
 * @property {string} id
 */

exports.get = (req, res) => {
  res.json({});
};
exports.create = (req, res) => {
  /*
    cuando multer recibe una imagen la guarda en un propiedad llamada file.
  */
  const { file } = req;
  if (!file) return res.json({ uploaded: false });

  db.add(Object.assign({ id }, file));

  res.json({ uploaded: true });
};
exports.delete = (req, res) => {
  res.json({});
};
exports.update = (req, res) => {
  res.json({});
};
