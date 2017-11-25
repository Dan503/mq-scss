'use strict';

// dependencies
import gulp from 'gulp';
import git from 'gulp-git';
import bump from 'gulp-bump';
import gutil from 'gulp-util';
import minimist from 'minimist';

const reload = require('require-reload')(require);

const args = minimist(process.argv.slice(2));

const releaseBranch = 'release/version-update';

/**
 * SIMPLE VERSION BUMPING
 *
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp bump --patch   # makes v0.1.0 → v0.1.1
 *     gulp bump --minor   # makes v0.1.1 → v0.2.0
 *     gulp bump --major   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible change.
 *
**/

/**
 * FULL GIT RELEASES
 *
 * You can use the commands
 *
 *     gulp release           # no version number change
 *     gulp release --patch   # makes v0.1.0 → v0.1.1
 *     gulp release --minor   # makes v0.1.1 → v0.2.0
 *     gulp release --major   # makes v0.2.1 → v1.0.0
 *
 * To do a full git flow release process automatically.
 * All changes must be committed to git before running this task
 */

function getBumpType(){
	if (args.patch && args.minor ||	args.minor && args.major ||	args.major && args.patch) {
		throw '\nYou can not use more than one version bump type at a time\n';
	}

	if (args.patch){
		return 'patch';
	} else if (args.minor){
		return 'minor';
	} else if (args.major) {
		return 'major';
	} else {
		return false;
	}
}

function checkError(err){
	if (err) throw err;
}

//Bump up the current version number
function bumpVersion(importance){
	return function bump_version (done){
		if (!importance) throw new Error(`
  An importance must be specified for a version bump to occur.
  Valid importances: "--patch", "--minor", "--major"
`);
		// get all the files to bump version in
		return gulp.src('./package.json')
			// bump the version number in those files
			.pipe(bump({type: importance}))
			// save it back to filesystem
			.pipe(gulp.dest('./'))
			//commit the changed version number
			.pipe(git.commit(`${importance} version bump`))
	}
}

//Tag current version number in git
function tag_version(){
	return new Promise((resolve, reject)=>{
		const pkg = reload('../../package.json');
    const tag = `v${pkg.version}`;
    gutil.log('Tagging as: '+gutil.colors.cyan(tag));
    git.tag(tag, `Tagging as ${tag}`, (err)=>{
			checkError(err);
			resolve(tag);
    })
	})
}


///GIT PROMISES

function check_out(branch){
	return new Promise((resolve, reject)=>{
		git.checkout(branch, (err)=>{
			checkError(err);
			resolve()
		});
	})
};

function merge_into_current(branch){
	return new Promise((resolve, reject)=>{
		git.merge(branch, {args:'--no-ff'}, (err)=>{
			checkError(err);
			resolve()
		});
	})
};

//RELEASE FUNCTIONS

function finish_release(done){
	return check_out('master')
		.then(()=> merge_into_current('develop'))
		.then(()=> tag_version())
		.then(()=> check_out('develop'))
}

//Do a full Git Flow release which can optionally include a version bump
function release(importance) {
	const version_bump = done => importance !== false ? gulp.series(bumpVersion(importance))(done) : done();

	return done => gulp.series(
		() => check_out('develop'),
		version_bump,
		finish_release
	)(done);
}

export default function () {

	//TASKS
	gulp.task('bump', gulp.series(
		bumpVersion(getBumpType())),
		tag_version
	);
	
	gulp.task('release', release(getBumpType()));

}
