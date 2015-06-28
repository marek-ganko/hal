var gulp = require('gulp');
var gulpPlugins = require('gulp-load-plugins')();
var gutil = gulpPlugins.util;

var paths = {
  sass: ['./scss/**/*.scss'],
  less: ['./src/**/*.less'],
  jade: ['./src/**/*.jade'],
  js: ['./src/**/*.js'],
  all: ['./src/**/*.*'],
  dist: 'www/'
};

gulp.task('default', ['copy']);

gulp.task('watch', function() {
  gulp.watch(paths.all, ['copy']);
});

gulp.task('install', ['git-check'], function() {
  return gulpPlugins.bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!gulpPlugins.shelljs.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('less', function () {
  return gulp.src(paths.less)
      .pipe(gulpPlugins.plumber())
      .pipe(gulpPlugins.less({compress: true}))
      .pipe(gulp.dest(paths.dist));
});

gulp.task('jade', function() {
  gulp.src(paths.jade)
      .pipe(gulpPlugins.jade())
      .pipe(gulp.dest(paths.dist))
});

gulp.task('js', function() {
  gulp.src(paths.js)
      .pipe(gulp.dest(paths.dist));
});

gulp.task('copy', ['less', 'js', 'jade'], function() {
});

gulp.task('run', ['copy'], function () {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.jade, ['jade']);
});

