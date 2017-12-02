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
      path.join(dirs.source, '**/*.{scss,sass,js}'),
    ])
      .pipe(plugins.modernizr('modernizr.min.js', modernizr_settings))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(path.join(taskTarget, dirs.assets, dirs.scripts.replace(/^_/, ''))));
  }));
}
