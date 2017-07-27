'use strict'

process.env.DEBUG = process.env.DEBUG || 'credly-widget:*'

const gulp = require('gulp')
const sass = require('gulp-sass')
const spawn = require('child_process').spawn

let node

const paths = {
  javascript: {
    server: ['./bin/www', './app.js', './lib/**/*.js', './routes/**/*.js'],
    client: ['./client/app/**/*.js', './client/app/**/*.jsx']
  },
  sass: ['./public/stylesheets/**/*.sass']
}

function killNode () {
  return new Promise((resolve, reject) => {
    if (node) {
      node.on('close', resolve)
      node.kill('SIGINT')
    } else {
      resolve()
    }
  })
}

gulp.task('server', function () {
  return killNode().then(function () {
    const env = Object.create(process.env)
    env.DEV_WEBPACK = 1
    node = spawn('node', [`./bin/www`], {stdio: 'inherit', env})
    node.on('close', (code) => {
      if (code !== 0) {
        process.exit(code)
      }
    })
  })
})

gulp.task('server:watch', function () {
  return gulp.watch(paths.javascript.server, ['server'])
})

gulp.task('sass', function () {
  return gulp.src('./public/stylesheets/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'))
})

gulp.task('sass:watch', function () {
  return gulp.watch(paths.sass, ['sass'])
})

gulp.task('default', ['sass', 'sass:watch', 'server', 'server:watch'])
