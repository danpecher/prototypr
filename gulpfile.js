var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cssImport = require('gulp-import-css');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var vendor = 'assets/vendor/';

gulp.task('scripts', function(){
  gulp.src([
  	vendor + 'jquery/dist/jquery.min.js',
  	vendor + 'bootstrap/dist/js/bootstrap.min.js',
  	])
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest('public/build/js/'));
});

gulp.task('styles', function(){
  gulp.src([
  	'assets/style/app.scss'
  	])
  .pipe(sass())
  .pipe(cssImport())
  .pipe(concat('app.min.css'))
  .pipe(gulp.dest('public/build/css/'))
  .pipe(reload({stream: true}));
});

gulp.task('default', function(){
  gulp.watch('assets/style/**/*.scss', ['styles']);
  gulp.watch('assets/js/**/*.js', ['scripts']);
  gulp.watch('views/**/*.blade.php', reload);
  var spawn = require('child_process').spawn;
  spawn('php', ['-S', '127.0.0.1:8000', '-t', 'public']);
  browserSync({
      proxy: "127.0.0.1:8000"
  }); 
});