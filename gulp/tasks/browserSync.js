'use strict';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  // BrowserSync
  gulp.task('browserSync', (done) => {
    browserSync.init({
      open: args.open ? 'local' : false,
      //startPath: config.baseUrl,
      port: config.port || 3000,
      server: {
        baseDir: taskTarget
      }
    });
    done();
  });
}
