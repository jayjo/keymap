/* Gulp File Bitches */

// Grab the gulp packages
var gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    jshint          = require('gulp-jshint'),
    stylus          = require('gulp-stylus'),
    concat          = require('gulp-concat'),
    watch           = require('gulp-watch'),
    browserSync     = require('browser-sync').create(),
    path            = require('path'),
    swig            = require('gulp-swig'),
    fs              = require('fs'),
    data            = require('gulp-data'),
    pug             = require('gulp-pug'),
    sourcemaps      = require('gulp-sourcemaps');

// define the default task and add the watch task to insert after
gulp.task('default', ['watch']);

// reload the browser each time a file changes and the watch task is run
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'public',
      index: "index.html"
    },
    files: ["/source/**/*"]
  });
});

// configure the jshint task
gulp.task('jshint', function(){
  return gulp.src('source/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// build the JS files
gulp.task('build-js', function(){
  return gulp.src('source/javascript/index.js')
    .pipe(sourcemaps.init()) // Processes the original sources
      .pipe(concat('global.js')) // Builds all js files into one
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write()) // Add the sourcemaps to the modified source
    .pipe(gulp.dest('public/assets/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// build the stylus files
gulp.task('build-css', function(){
  return gulp.src('source/stylesheets/**/*.styl')
    .pipe(sourcemaps.init()) // Processes the original sources
      .pipe(stylus({
        compress: true,
        linenos: true
      }))
    .pipe(sourcemaps.write()) // Add the sourcemaps to the modified source
    .pipe(concat('style.css')) // Builds all stylus files into one
    .pipe(gulp.dest('public/assets/stylesheets'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// build the Pug files into HTML
gulp.task('build-pug', function buildHTML(){
  return gulp.src('source/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', ['browserSync'], function(){
  gulp.watch('source/javascript/**/*.js', ['jshint']);
  gulp.watch('source/javascript/**/*.js', ['build-js']);
  gulp.watch('source/stylesheets/**/*.styl', ['build-css']);
  gulp.watch('source/**/*.pug', ['build-pug']);
});