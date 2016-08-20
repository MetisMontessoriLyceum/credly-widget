'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('default', ['sass','sass:watch']);

gulp.task('sass', function () {
  return gulp.src('./public/stylesheets/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/stylesheets/**/*.sass', ['sass']);
});
