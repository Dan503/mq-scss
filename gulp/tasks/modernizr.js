'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let modernizr_settings = {
    options : [
          "setClasses",
          "html5printshiv",
          "testProp",
          "mq"
      ],
      tests: [
        'flexbox',
        'flexwrap'
      ]
  };

  gulp.task('modernizr', gulp.series('copy', ()=> {
    return gulp.src([
      [dirs.source, '**/*.{scss,sass,js}'].join('/'),
    ])
      .pipe(plugins.modernizr('modernizr.min.js', modernizr_settings))
      .pipe(plugins.uglify())
      .pipe(gulp.dest([taskTarget, dirs.assets,  dirs.scripts.replace(/^_/, '')].join('/')));
  }));
}
