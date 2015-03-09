'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var nodemon = require('gulp-nodemon');
var series = require('stream-series');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minifyCss = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('develop', ['inject'], function() {

  gulp.watch('./icenine/app/styles/**/*.scss', ['sass', reload]);
  gulp.watch('./icenine/app/views/**/*.html', ['views', reload]);
  gulp.watch('./icenine/app/scripts/**/*.js', ['scripts', reload]);
  gulp.watch('./icenine/app/images/**/*.js', ['images', reload]);
  gulp.watch('./icenine/app/index.html', ['inject', reload]);

  nodemon({
    script: 'icenine/server.js',
    env: { 'NODE_ENV': 'development' },
    ignore: ['public/**/*', 'icenine/app/**/*', 'node_modules/**/*']
  });
  setTimeout(function() {
    browserSync({
      proxy: 'localhost:8080'
    });
  }, 2000)
});

gulp.task('views', function() {
  var viewStream = gulp.src(['./icenine/app/views/**/*'])
    .pipe(gulp.dest('./public/views'));

  var textStream = gulp.src(['./icenine/app/text/**/*'])
    .pipe(gulp.dest('./public/markdown'));

  return merge(viewStream, textStream);
});

gulp.task('images', function() {
  return gulp.src(['./icenine/app/images/**/*'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('public/img'));
});

gulp.task('styles', function() {

  // concat and minify vendor stylings
  var vendorStream = gulp.src(mainBowerFiles(['*.css', '**/*.css']))
    .pipe(concat('vendor.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/css'));

  // compile and minify application stylings
  var appStream = gulp.src('./icenine/app/styles/app.scss')
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/css'));

  return merge(vendorStream, appStream);
});

gulp.task('scripts', function() {

  // concat vendor scripts
  var vendorStream = gulp.src(mainBowerFiles(['*.js', '**/*.js']))
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));

  // concat and minify application scripts
  var appStream = gulp.src(['./icenine/app/scripts/**/*.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))

  return merge(vendorStream, appStream);
});

gulp.task('inject', ['scripts', 'styles', 'images', 'views'], function() {
  var target = gulp.src('./icenine/app/index.html');
  var vendorJs = gulp.src(['./public/js/vendor.min.js'], {read: false});
  var vendorCss = gulp.src(['./public/css/vendor.css'], {read: false});
  var appJs = gulp.src(['./public/js/app.min.js'], {read: false});
  var appCss = gulp.src(['./public/css/app.css'], {read: false});

  return target.pipe(inject(series(vendorJs, appJs, vendorCss, appCss), {ignorePath: '/public/'}))
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['develop']);
