/**
 * @see https://stackoverflow.com/questions/10216395/error-failed-to-lookup-view-in-express
 *
 * kill ports:
 * @see https://unix.stackexchange.com/questions/140482/kill-any-service-running-at-a-specific-port
 */
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const { join, extname } = require('path');
const multer = require('multer');
const lb = require('loopback');
const { schema, resolvers } = require('./graphql');
const { uuidv4 } = require('./utils');
const app = express();

// controllers
const imageController = require('./controllers/image.controller');
const fakerController = require('./controllers/faker.controller');
const googleDriveController = require('./controllers/google.drive.controller');

// settings
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// app.set('json replacer', replacer); // property transformation rules
app
  .set('json spaces', 2) // number of spaces for indentation
  .use(require('morgan')('dev'))
  .use(express.json())
  .use('/gql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  }))
  .set('views', join(__dirname, 'views'))
  .set('view engine', 'pug');

const staticDirUploads = join(__dirname, 'public', 'uploads');

// middlewares
/**
 * @see https://www.npmjs.com/package/multer
 */
const upload = multer({
  dest: staticDirUploads /* dest or storage */,
  storage: multer.diskStorage({
    destination: staticDirUploads,
    /**
     * cambiar el nombre con el que se guarda la imagen
     * @param {*} req
     * @param {*} param1
     * @param {*} next
     */
    filename(req, { originalname }, next) {
      next(null, `${uuidv4()}${extname(originalname)}`);
    },
  }),
  limits: {
    fileSize: 1000000 /*1megaabyte*/,
  },
  /**
   * validación de imagen.
   * @param {*} req
   * @param {*} param1
   * @param {*} next
   */
  fileFilter(req, { mimetype, originalname }, next) {
    const filetypes = /jpe*g|png|gif/;
    const mime_type = filetypes.test(mimetype);
    const ext_name = filetypes.test(extname(originalname));
    console.log(mime_type, ext_name);
    if (mime_type && ext_name) {
      return next(null, true);
    }
    next('Tipo de imagen invalida');
  },
}).single('image');

// static files
app.use(express.static(join(__dirname, 'public')));

// routes
app
  .get('/', (_, res) => res.render('index', { title: 'Hoy' }))
  .get('/img', (_, res) => res.render('crud_img', { title: 'Hoy' }))
  .get('/v1/img', imageController.get)
  .post('/v1/img', upload, imageController.create)
  .delete('/v1/img', imageController.delete)
  .patch('/v1/img', imageController.update)
  .get('/v1/providers', fakerController.getproviders)
  .get('/v1/articles', fakerController.getarticles)
  .get('/v1/users-random', fakerController.getusersrandom)
  .get('/v1/spreadsheets', googleDriveController.get)
  .get('/v1/geopoint', (req, res) => {
    var here = new lb.GeoPoint({lat: 10, lng: 10});
    var there = new lb.GeoPoint({lat: 5, lng: 5});

    console.dir(lb.GeoPoint);

    // console.dir(lb.Router);

    console.log(here.distanceTo(there, {type: 'kilometers'})); // result: 438
    
    console.dir(here);
    
    return res.json({
      here: here.toString(),
      there,
      distanceTo: here.distanceTo(there, {type: 'meters'})
    });
  })
  .listen(3000, () => {
    console.log('Server up in port 3000');
  });
