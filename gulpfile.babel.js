'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSyncLib from 'browser-sync';
import pjson from './package.json';
import minimist from 'minimist';
import wrench from 'wrench';

import {jsWatch} from './gulp/config/shared-vars';

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
const plugins = gulpLoadPlugins();

const defaultNotification = function(err) {
  return {
    subtitle: err.plugin,
    message: err.message,
    sound: 'Funk',
    onLast: true,
  };
};

let config = Object.assign({}, pjson.config, defaultNotification);

let args = minimist(process.argv.slice(2));
let dirs = config.directories;
let taskTarget = args.production ? dirs.destination : dirs.temporary;

// Create a new browserSync instance
let browserSync = browserSyncLib.create();

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks
wrench.readdirSyncRecursive('./gulp/tasks').filter((file) => {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require('./gulp/tasks/' + file)(gulp, plugins, args, config, taskTarget, browserSync);
});

let watch = false;

// Compiles all the code
gulp.task('compile', gulp.series(
  gulp.parallel(
    'copy',
    'pug',
    'imagemin',
    'sass',
    'modernizr',
    'browserify'
  )
));


// Default task
gulp.task('default', gulp.series(
  'clean',
  (done) => {
    jsWatch.isEnabled = true;
    done();
  },
  'compile',
  'watch'//watch holds browsersync
));

// Build production-ready code
gulp.task('build', gulp.series(
  'clean',
  (done) => {
    jsWatch.isEnabled = true;
    done();
  },
  'compile'
));

// Server tasks with watch
gulp.task('serve', gulp.series('default'));

// Testing
gulp.task('test', gulp.series('eslint'));
