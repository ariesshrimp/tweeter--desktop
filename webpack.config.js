'use strict'

module.exports = {
  entry: './source/entry.js',
  output: { path: __dirname, filename: 'bundle.js' },
  resolve: { modules: [ 'node_modules' ] },
  target: 'node',
  module: {
    loaders: [
      { test: /.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /.json$/, loader: 'json'}
    ]
  }
}
