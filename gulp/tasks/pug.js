'use strict';

import fs from 'fs';
import path from 'path';
import foldero from 'foldero';
import pug from 'pug';
import yaml from 'js-yaml';
import notifier from 'node-notifier';
import { notification_icon_location, pjson } from '../config/shared-vars';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget);
  let dataPath = path.join(dirs.source, dirs.data);

  // Jade template compile
  gulp.task('pug:compile', (done) => {
    let siteData = {};
    if (fs.existsSync(dataPath)) {
      // Convert directory to JS Object
      siteData = foldero(dataPath, {
        recurse: true,
        whitelist: '(.*/)*.+\.(json|ya?ml)$',
        loader: function loadAsString(file) {
          let json = {};
          try {
            if (path.extname(file).match(/^.ya?ml$/)) {
              json = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
            }
            else {
              json = JSON.parse(fs.readFileSync(file, 'utf8'));
            }
          }
          catch(e) {
            console.log('Error Parsing DATA file: ' + file);
            console.log('==== Details Below ====');
            console.log(e);
          }
          done();
          return json;
        }
      });
    }

    // Add --debug option to your gulp task to view
    // what data is being loaded into your templates
    if (args.debug) {
      console.log('==== DEBUG: site.data being injected to templates ====');
      console.log(siteData);
      console.log('\n==== DEBUG: package.json config being injected to templates ====');
      console.log(config);
    }

    const pugFilters = [ require('marked') ];

    let itteration = 0;

    return gulp.src([
      path.join(dirs.source, '**/*.pug'),
      '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}')
    ])
    .pipe(plugins.changed(dest))
    .pipe(plugins.plumber((error)=>{
      if(itteration === 0) {
        console.log(`\n ${plugins.util.colors.red.bold('Pug failed to compile:')} ${plugins.util.colors.yellow(error.message)}\n`);

        console.log(error.stack);

        itteration++;
        return notifier.notify({title: 'Pug Error', message: 'Pug compilation error', icon: notification_icon_location+'gulp-error.png'});
      }
    }))
    .pipe(plugins.pug({
      //pug: pug,
      pretty: true,
      basedir: './'+[dirs.source].join('/'),
      filters: pugFilters,
      locals: {
        require,
        pkg: pjson,
        config,
        pugFilters,
        compile: pug.compile,
        debug: true,
        site: {
          data: siteData
        }
      }
    }))
    .pipe(plugins.htmlmin({
      collapseBooleanAttributes: true,
      conservativeCollapse: true,
      removeCommentsFromCDATA: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true
    }))
    .pipe(gulp.dest(dest))
    .on('end', browserSync.reload);
  });

  gulp.task('pug', gulp.series('symbolize-svgs', 'pug:compile'));

}
