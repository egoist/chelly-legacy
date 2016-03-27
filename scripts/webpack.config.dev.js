const webpack = require('webpack')
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer')
const config = require('./webpack.config')

config.debug = true
config.devtool = 'cheap-module-eval-source-map'
config.entry.push('webpack-hot-middleware/client?path=http://localhost:3077/__webpack_hmr')
config.output.publicPath = 'http://localhost:3077/build/'

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': true,
    'process.env': JSON.stringify('development')
  })
)

config.target = webpackTargetElectronRenderer(config)

module.exports = config
