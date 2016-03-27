const server = require('webpack-hot-server')

const config = require('./webpack.config.dev')

server({port: 3077, config, customIndex: true})
  .then(port => {
    console.log(`Running at http://localhost:${port}`)
  })
