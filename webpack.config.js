module.exports = {
  entry: ['./src/js/chelly.js'],
  output: {
    path: __dirname + '/lib/js',
    filename: 'chelly.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel?stage=0'] },
    ]
  },
  plugins: [],
  target: 'atom'
}