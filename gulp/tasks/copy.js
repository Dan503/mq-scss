'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget);

  gulp.task('copy:icomoon', () => {
    return gulp.src([
      path.join(dirs.source, '_icomoon/fonts/**/*'),
    ])
    .pipe(gulp.dest(path.join(taskTarget, dirs.assets, 'icomoon')));
  });

  // Copy
  gulp.task('copy', gulp.parallel('copy:icomoon', () => {
    return gulp.src([
      path.join(dirs.source, '**/*'),
      '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}'),
      '!' + path.join(dirs.source, '**/*.pug')
    ])
    .pipe(plugins.changed(dest))
    .pipe(gulp.dest(dest));
  }));
}
