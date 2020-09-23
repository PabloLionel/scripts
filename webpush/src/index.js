require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewates
/**
 * Para ver por consola las peticiones
 * que van llegando.
 */
app.use(require('morgan')('dev'));
/**
 * Convertimos en objetos todos los
 * json que nos llega al servidor
 * con la utilidad de express.json.
 * Y si los datos llegan de un form,
 * hay otra configuración llamada
 * express.urlencoded.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use(require('./routers/index'));

// static content
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'));

console.log(`Server on port ${app.get('port')}`);
