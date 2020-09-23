'use strict';
const
    //[[[[[[[[[[TAREAS]]]]]]]]]]
    gulp          = require('gulp'),
    // [[[[[[[[[[HTML]]]]]]]]]]
    pug           = require('gulp-pug'), //compila archivos .pug
    htmlmin       = require('gulp-htmlmin'),
    // [[[[[[[[[[CSS]]]]]]]]]]
    sass          = require('gulp-sass'), //compila archivos .scss o .sass
    autoprefixer  = require('gulp-autoprefixer'),// compatibilisa nuestro css
    csscomb       = require('gulp-csscomb'), //formatea los archivos css
    cssnano       = require('gulp-cssnano'), //minifica css
    //  [[[[[[[[[[JS]]]]]]]]]]
    //[[[[[[[[[[SystFlow]]]]]]]]]]
    plumber       = require('gulp-plumber'), //control de errores
    rename        = require('gulp-rename'), //renombra los archivos en el destino
    browserSync   = require('browser-sync').create(), //inyecta las salida en el navegador anfitrin
    sourcemaps    = require('gulp-sourcemaps'), // mapea el origen
    SRC           = './src/dev/',
    DEST_DEV      = './src/dist/', //de desarrollo
    DEST_PROD     = './src/server/app/public/';//de produccion, cambiar tb en bs-config.js

//Variables Globales:
//=======================================================================

//para capturar el error y no detener el proceso gulp
var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};
var plumberOptions = {
  errorHandler: onError,
};

var postCSSOptions = require('./config.postcss.json');
var autoprefixerOptions = postCSSOptions.autoprefixer;

//para renderizar los resultados front-end
var browserSyncConfig = require('./bs-config.js');

//Tareas:
//=======================================================================
gulp.task('pug', () => 
  gulp.src(SRC + 'view/**/*.pug')
    .pipe(plumber(plumberOptions))
    .pipe(pug({
        pretty:true/*para que el resultado no este comprimido*/
    }))
    .pipe(gulp.dest(DEST_DEV))
    .pipe(htmlmin())
    .pipe(gulp.dest(DEST_PROD))
    .pipe(browserSync.stream())
)

gulp.task('sass', () => 
    gulp.src([SRC + 'sass/main.sass',SRC + 'sass/main.scss'])
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(csscomb('.csscomb.json'))
    .pipe(sourcemaps.write(DEST_DEV))
    .pipe(gulp.dest(DEST_DEV + 'css/'))
    .pipe(cssnano())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(DEST_DEV + 'css/'))
    .pipe(gulp.dest(DEST_PROD + 'css/'))
    .pipe(browserSync.stream())
)

gulp.task('js', () => {
  gulp.src([SRC + 'sass/main.sass',SRC + 'sass/main.scss'])
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    //pipes para procesar js van aquí
    .pipe(gulp.dest(DEST_DEV + 'js/'))
    .pipe(gulp.dest(DEST_PROD + 'js/'))
    .pipe(browserSync.stream())
})

// NOTE: recarga el navegador actualizando los cambios realizados [.css y html]
gulp.task('default',['sass','pug','js'],()=>{

  browserSync.init(require('./bs-config.js'));
  
	gulp.watch(SRC + 'js/*.js',['js']).on('change', browserSync.reload);
	gulp.watch(SRC + 'view/*.pug', ['pug']).on('change', browserSync.reload);
  gulp.watch([SRC + 'sass/*.scss',SRC + 'sass/*.sass'], ['sass']).on('change', browserSync.reload);
  console.log(SRC, ' ', DEST_PROD, ' ',DEST_DEV, ' ')
});