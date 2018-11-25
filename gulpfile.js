var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var minify = require('gulp-minify');
var webserver = require('gulp-webserver');
const babel = require('gulp-babel');

// var browserify = require('gulp-browserify');

gulp.task('default', ['webserver', 'sass', 'watch', 'compress']);

gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(concat('style.min.css'))
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
    .pipe(livereload());
});

gulp.task('compress', function () {
  gulp.src('src/app/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(minify({
      ext: {
        src: '-debug.js',
        min: '-min.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('public/js'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/app/*.js', ['compress']);
  gulp.watch('/*.html');
});

gulp.task('webserver', ['watch'], function () {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
    }))
});

// Fix for usage export and import
// gulp.task('scripts', function() {
//   // Single entry point to browserify
//   gulp.src('public/js/app-min.js')
//       .pipe(browserify({
//         insertGlobals : true,
//       }))
//       .pipe(gulp.dest('./build/js'))
// });