
const gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const server = require('gulp-server-livereload');

gulp.task('clean', function() {
  return gulp.src('dist/', { read: false, allowEmpty: true })
    .pipe(clean());
});

gulp.task('static', function() {
  return gulp.src('src/**')
    .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', function() {
  return gulp.src([
      'bower_components/bootstrap/dist/fonts/**'
    ])
    .pipe(gulp.dest('dist/vendor/fonts'));
});

gulp.task('styles', function() {
  return gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.min.css',
      'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
      'bower_components/angular-timeline/dist/angular-timeline.css',
      'bower_components/angular-timeline/dist/angular-timeline-bootstrap.css'
    ])
    .pipe(concat('app.css'))
    .pipe(gulp.dest('dist/vendor/css'));
});

gulp.task('scripts', function() {
  return gulp.src([
      'bower_components/angular/angular.min.js',
      'bower_components/angular-timeline/dist/angular-timeline.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/vendor/js'));
});

gulp.task('build', gulp.series('static', 'fonts', 'styles', 'scripts'));

gulp.task('default', gulp.series('clean', 'build'));

gulp.task('serve', function () {
  gulp.src('dist/')
    .pipe(server({
      host: '127.0.0.1',
      livereload: true,
      open: true
    }));
});

gulp.task('watch', function () {
  gulp.watch('src/**', gulp.series('static'));
});

gulp.task('start', gulp.parallel('serve', 'watch'));
