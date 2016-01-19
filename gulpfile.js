// //////////////////////////////////////////////////////////
// REQUIRED
// //////////////////////////////////////////////////////////
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass'),
	browerSync = require('browser-sync'),
	reload = browerSync.reload,
	autoprefixer = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	del = require('del'),
	rename = require('gulp-rename');
// //////////////////////////////////////////////////////////
// SCRIPTS
// //////////////////////////////////////////////////////////
gulp.task('scripts', function(){
	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
	.pipe(plumber())
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(reload({stream:true}));
});
// //////////////////////////////////////////////////////////
// COMPASS
// //////////////////////////////////////////////////////////
gulp.task('compass', function(){
	gulp.src('app/scss/style.scss')
	.pipe(plumber())
	.pipe(compass({
		config_file: './config.rb',
		css: 'app/css',
		sass: 'app/scss',
		require: ['susy']
	}))
	.pipe(autoprefixer('last 2 versions'))
	.pipe(gulp.dest('app/css'))
	.pipe(reload({stream:true}));
});
// //////////////////////////////////////////////////////////
// HTML
// //////////////////////////////////////////////////////////
gulp.task('html', function(){
	gulp.src('app/**/*.html')
	.pipe(reload({stream:true}));
});
// //////////////////////////////////////////////////////////
// Browser-Sync
// //////////////////////////////////////////////////////////
gulp.task('brower-sync', function(){
	// .init starts the server
  browerSync.init({
    server: "./app",
    port: 3010
  });
});
gulp.task('build:serve', function(){
	// .init starts the server
  browerSync.init({
    server: "./build",
    port: 3010
  });
});
// //////////////////////////////////////////////////////////
// Tasks for production
// //////////////////////////////////////////////////////////
// Clear
gulp.task('build:cleanfolder', function(){
	del([
		'build/**'
	]);
});
// Copy
gulp.task('build:copy', ['build:cleanfolder'], function(){
	return gulp.src('app/**/*')
	.pipe(gulp.dest('build/'));
});
// Delete files we do not need in project
gulp.task('build:remove', ['build:copy'], function(cb){
	del([
		'build/scss',
		'build/js/!(*.min.js)'
	], cb);
});

gulp.task('build', ['build:copy', 'build:remove', 'build:serve']);
// //////////////////////////////////////////////////////////
// WATCH
// //////////////////////////////////////////////////////////
gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/scss/**/*.scss', ['compass']);
	gulp.watch('app/**/*.html', ['html']);
});
gulp.task('default', ['scripts', 'compass', 'html', 'brower-sync','watch']);