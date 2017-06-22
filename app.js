const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const user = require('./api/user')
const table = require('./api/table')
const badgeDetails = require('./api/badge-details')
const latestBadges = require('./api/latest-badges')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'client/public')))

app.use('/api/user', user)
app.use('/api/table', table)
app.use('/api/badge-details', badgeDetails)
app.use('/api/latest-badges', latestBadges)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

module.exports = app
