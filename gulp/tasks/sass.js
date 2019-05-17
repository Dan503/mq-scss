'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';
import px2rem from 'postcss-pxtorem';
import gulpif from 'gulp-if';
import notifier from 'node-notifier';
import { notification_icon_location } from '../config/shared-vars';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let entries = config.entries;
  let dest = [taskTarget, dirs.assets, dirs.styles.replace(/^_/, '')].join('/');

  const px2rem_settings = {
    rootValue: 10,
    propWhiteList: ['font', 'font-size', 'letter-spacing'],
    replace: false,
  };

  // Sass compilation
  gulp.task('sass', () => {
    return gulp.src([
      [dirs.source, dirs.styles, '*.scss'].join('/'),
      '!'+[dirs.source, dirs.styles, '_*.scss'].join('/'),
    ])
      .pipe(plugins.plumber((error)=>{
        console.log(`\n ${plugins.util.colors.red.bold('Sass failed to compile:')} ${plugins.util.colors.yellow(error.message)}\n`);
        //console.error(error.stack);
        return notifier.notify({title: 'Sass Error', message: `${path.basename(error.file)} line ${error.line}`, icon: notification_icon_location+'gulp-error.png'});
      }))
      .pipe(plugins.wait(100))//Helps prevent odd file not found error
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sassGlob())
      .pipe(plugins.sass({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: [
          [dirs.source, dirs.styles].join('/'),
          [dirs.source, dirs.modules].join('/'),
          ['node_modules'].join('/')
        ]
      }).on('error', plugins.sass.logError))
      .pipe(plugins.postcss([
        autoprefixer({browsers: ['> 1%'], grid: true}),
        px2rem(px2rem_settings)
      ]))
      .pipe(plugins.rename(function(path) {
        // Remove 'source' directory as well as prefixed folder underscores
        // Ex: 'src/_styles' --> '/styles'
        path.dirname = path.dirname.replace(dirs.source, '').replace('_', '');
      }))
      .pipe(gulpif(args.production, plugins.cssnano({rebase: false})))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream({match: '**/*.css'}));
  });
}
