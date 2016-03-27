const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const postcssPlugins = function(webpack) {
  return [
    require('postcss-import')({
      addDependencyTo: webpack
    }),
    require('postcss-cssnext')()
  ]
}

module.exports = {
  entry: ['./src/index'],
  output: {
    path: Path.join(process.cwd(), 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.css', '.sss']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: [/node_modules/]
      },
      {
        test: /\.vue$/,
        loaders: ['vue']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Chelly',
      filename: 'index.html',
      template: './scripts/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
  ],
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  },
  vue: {
    autoprefixer: false,
    postcss: postcssPlugins
  },
  postcss: postcssPlugins
}
