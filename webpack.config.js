var path = require('path')

module.exports = {
  entry: ['./src/chelly.js'],
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel?stage=0'] },
    ]
  },
  plugins: [],
  target: 'atom'
}
