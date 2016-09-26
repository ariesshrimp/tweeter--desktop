'use strict'
const PATH = require('path')
const FS = require('fs')

module.exports = {
  devtool: 'inline-source-map',
  entry: './source/entry.js',
  output: {
    path: PATH.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  target: 'node',
  module: {
    loaders: [
      { test: /.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /.json$/, loader: 'json'}
    ]
  },
  devServer: {
    contentBase: './public'
  }
}
