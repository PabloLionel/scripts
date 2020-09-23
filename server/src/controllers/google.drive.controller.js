/**
 * Ir a la consola de google
 * @link https://console.developers.google.com
 * 1) Creamos un proyecto
 * 2) Habilitamos la api de google drive (bóton apis y servicios).
 * 3) Habilitamos la api de google sheets (bóton apis y servicios).
 * 4) Creamos Credenciales.
 *  4.1) ¿Qué API estás utilizando? -> Google drive api
 *  4.2) ¿Desde dónde llamarás a la API? -> Servidor web
 *  4.3) ¿A qué tipo de datos accederás? -> Datos de aplicación
 *  4.4) ¿Tienes pensado utilizar esta API en App Engine o en Compute Engine? -> No, no las estoy usando
 *  4.5) Crear una cuenta de servicio
 *    4.5.1) Nombre de cuenta de servicio -> ej. "demo"
 *    4.5.2) Rol -> [(proyecto, editor)]
 *    4.5.3)  Tipo de clave -> JSON
 * 5) Compartir spreadsheets con el usuario (4.5.1)
 *
 * @example https://docs.google.com/spreadsheets/d/1NIFshVfTsFIhE1AXQrn4-7_J15AHtMNTMo6BuGHD0oM/edit#gid=0
 *
 * continuar despues https://www.youtube.com/watch?v=lNattW06LlA
 */
const { GoogleSpreadsheet } = require('google-spreadsheet');

const credenciales = require('../json/demosheets-d5b4f6b63169.json');

let googleId = '1NIFshVfTsFIhE1AXQrn4-7_J15AHtMNTMo6BuGHD0oM';
let sheet = null;
const toAccessSpreadsheets = async () => {
  if (!sheet) {
    const document = new GoogleSpreadsheet(googleId);
    await document.useServiceAccountAuth(credenciales);
    await document.loadInfo();
    sheet = document.sheetsByIndex[0];
  }
  return sheet;
};

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

const getItem = async () => {
  const sheet = await toAccessSpreadsheets();
  console.dir(await sheet.getRows());
  return JSON.parse(JSON.safeStringify(await sheet.getRows()));
};
const addItem = async (item) => {
  const sheet = await toAccessSpreadsheets();
  sheet.addRow(item);
  return;
};

exports.get = async (req, res) => {
  res.status(200).json(await getItem());
};

exports.add = async (req, res) => {
  try {
    await addItem(req.body);
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e,
    });
  }
};

/*
const { v4 } = require('uuid');

const db = [];

exports.get = (req, res) => {
  res.status(200).json({ base: db });
};

exports.update = (req, res) => {
  console.log(db.find(({ uuid }) => uuid === req.params.uuid));
  res.status(200).json(this);
};
exports.delete = (req, res) => {
  res.status(200).json(this);
};
*/
