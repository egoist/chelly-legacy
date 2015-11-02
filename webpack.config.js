var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: ['./src/chelly.js'],
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  module: {
    loaders: [
      {
        test: /\.js$/, loaders: ['babel?stage=0'],
        exclude: [/node_modules/]
      },
      {
        test: /\.vue$/,
        loaders: ['vue']
      }
    ]
  },
  vue: {
    autoprefixer: false,
    loaders: {
      css: 'style!css!postcss'
    }
  },
  postcss: function () {
    return [
      require('postcss-nested')()
    ]
  },
  plugins: [
  ],
  target: 'atom'
}
