const path = require('path')

const BUILD_DIR = path.resolve(__dirname, 'client/public')
const APP_DIR = path.resolve(__dirname, 'client/app')

var config = {
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'credly-widget.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      }
    ]
  }

}

module.exports = config
