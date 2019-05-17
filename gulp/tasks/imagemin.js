'use strict';

import path from 'path';
import gulpif from 'gulp-if';
import pngquant from 'imagemin-pngquant';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = [taskTarget, dirs.assets, dirs.images.replace(/^_/, '')].join('/');

  // Imagemin
  gulp.task('imagemin', () => {
    return gulp.src([dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}'].join('/'))
      .pipe(plugins.changed(dest))
      // .pipe(gulpif(args.production, plugins.imagemin({
      //   progressive: true,
      //   svgoPlugins: [{removeViewBox: false}],
      //   use: [pngquant({speed: 10})]
      // })))
      .pipe(gulp.dest(dest));
  });
}
