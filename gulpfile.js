
const gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const server = require('gulp-server-livereload');

gulp.task('clean', function() {
  return gulp.src('./dist/', { read: false, allowEmpty: true })
    .pipe(clean());
});

gulp.task('copy-src', function() {
  return gulp.src('./src/**')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-ng', function() {
  return gulp.src([
      './bower_components/angular/angular.min.js'
    ])
    .pipe(gulp.dest('./dist/vendor'));
});

gulp.task('copy-bs', function() {
  return gulp.src([
      './bower_components/bootstrap/dist/css/bootstrap.min.css',
      './bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
    ])
    .pipe(gulp.dest('./dist/vendor'));
});

gulp.task('copy', gulp.series('copy-src', 'copy-ng', 'copy-bs'));

gulp.task('default', gulp.series('clean', 'copy'));

gulp.task('start', function() {
  gulp.src('./dist/')
    .pipe(server({
      host: '127.0.0.1',
      livereload: false,
      open: true
    }));
});
