var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port
var app = express()

var apiRoutes = express.Router()

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
app.use('/api', apiRoutes)
app.use(express.static('./dist'))
module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})
