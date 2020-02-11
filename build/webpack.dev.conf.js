'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
var axios = require('axios')
var express = require('express')
var app = express()
var apiRoutes = express.Router()
app.use('/api', apiRoutes)
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      app.get('/api/getRecommend', function (req, res) {
        var url = ' https://v1.itooi.cn/netease/banner'
        axios.get(url, {
          headers: {
            referer: 'https://v1.itooi.cn/',
            host: 'v1.itooi.cn'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
        })
      })
      app.get('/api/getDiscList', function (req, res) {
        var url = 'https://v1.itooi.cn/netease/songList/hot'
        axios.get(url, {
          headers: {
            referer: 'https://v1.itooi.cn/',
            host: 'v1.itooi.cn'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
        })
      })
      app.get('/api/getSongList', function (req, res) {
        var url = 'https://v1.itooi.cn/netease/songList'
        axios.get(url, {
          headers: {
            referer: 'https://v1.itooi.cn/',
            host: 'v1.itooi.cn'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
        })
      })
      app.get('/api/lyric', function (req, res) {
        var url = 'https://v1.itooi.cn/netease/lrc'
        axios.get(url, {
          headers: {
            referer: 'https://v1.itooi.cn/',
            host: 'v1.itooi.cn'
          },
          params: req.query
        }).then((response) => {
          var ret = response.data
          res.json(ret)
        }).catch((e) => {
          console.log(e)
        })
      })
      app.get('/api/TopList', function (req, res) {
        var url = 'https://v1.itooi.cn/netease/artist/top'
        axios.get(url, {
          headers: {
            referer: 'https://v1.itooi.cn/',
            host: 'v1.itooi.cn'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
        })
      })
      app.get('/api/MusicList', function (req, res) {
        var url = 'https://v1.itooi.cn/netease/song/artist'
        axios.get(url, {
          headers: {
            referer: 'https://v1.itooi.cn/',
            host: 'v1.itooi.cn'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
        })
      })
      app.get('/api/hotkey', function (req, res) {
        var url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
        })
      })
      app.get('/api/search', function (req, res) {
        var url = 'https://v1.itooi.cn/netease/search'
        axios.get(url, {
          headers: {
            referer: 'https://v1.itooi.cn/',
            host: 'v1.itooi.cn'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
        })
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
