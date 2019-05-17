'use strict';

import path from 'path';
import del from 'del';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;

  // Clean
  gulp.task('clean', (done)=>{
		del.sync([
	    [dirs.temporary].join('/'),
	  ]);
	  done();
  });
}
