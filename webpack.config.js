var path = require('path')

module.exports = {
  entry: ['./src/chelly.js'],
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel?stage=0'] },
      {
        test: /\.vue$/,
        loaders: ['vue']
      }
    ]
  },
  vue: {
    postcss: [
      require('postcss-import')(),
      require('postcss-nested')()
    ]
  },
  plugins: [],
  target: 'atom'
}
