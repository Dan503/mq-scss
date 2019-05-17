'use strict';

import path from 'path';

import { jsWatch } from '../config/shared-vars';


export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;

  // Watch task
  gulp.task('watch', gulp.parallel('browserSync', (done) => {

    jsWatch.isEnabled = true;
    jsWatch.calledFromWatch = true;

    if (!args.production) {
      // Styles
      gulp.watch([
        [dirs.source, dirs.styles, '**/*.{scss,sass}'].join('/'),
        [dirs.source, dirs.modules, '**/*.{scss,sass}'].join('/'),
        ['tests', '**/*.{scss,sass}'].join('/'),
      ])
      .on('change', gulp.series('sass'));

      // Scripts (watchify takes over, this is just to get the ball rolling)
      gulp.watch([
        [dirs.source, '**/*.js'].join('/'),
      ])
      .on('change', gulp.series('browserify'));

      // Jade Templates
      gulp.watch([
        [dirs.source, '**/*.pug'].join('/'),
        [dirs.source, dirs.data, '**/*.{json,yaml,yml}'].join('/')
      ])
      .on('change', gulp.series('pug:compile'));

      // Copy
      gulp.watch([
        [dirs.source, '**/*'].join('/'),
        '!' + [dirs.source, '{**/\_*,**/\_*/**}'].join('/'),
        '!' + [dirs.source, '**/*.pug'].join('/')
      ])
      .on('change', gulp.series('copy'));

      // Images
      gulp.watch([
        [dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}'].join('/')
      ])
      .on('change', gulp.parallel('imagemin', 'pug'));

      // All other files
      gulp.watch([
        [dirs.temporary, '**/*'].join('/'),
        '!' + [dirs.temporary, '**/*.{css,map,html,js}'].join('/')
      ]).on('change', browserSync.reload);
    }

    done();
  }));
}
