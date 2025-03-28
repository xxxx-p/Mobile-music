import { getLyric } from 'api/song.js'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'
export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url, ar }) {
        this.id = id
        // this.mid = mid
        this.singer = singer
        this.name = name
        // this.album = album
        this.duration = duration
        this.image = image
        this.url = url
        this.ar = ar
    }

    getLyrics() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return new Promise((resovle, reject) => {
            getLyric(this.id).then(res => {
                if (res) {
                    // this.lyric = Base64.decode(res.lyric) qq的歌词接口，需要用base64解密，网易云不用
                    this.lyric = res
                    resovle(this.lyric)
                } else {
                    reject('no lyric')
                }
            })
        })

    }
}
//歌手信息 ，qq接口 403，暂时只用来获取歌手的歌曲列表信息
export function createsingerSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    })
}
export function createSong(musicData) {
    return new Song({
        id: musicData.id,
        singer: musicData.album.artists[0].name,
        name: musicData.name,
        duration: musicData.bMusic.playTime / 1005.17013888888,
        image: musicData.album.blurPicUrl,
        url: `https://v1.itooi.cn/netease/url?id=${musicData.id}&quality=flac`
    })
}
export function createTopSong(musicData) {
    return new Song({
        id: musicData.privilege.id,
        singer: musicData.ar[0].name,
        name: musicData.name,
        duration: musicData.dt / 1000.847826086957,
        image: musicData.al.picUrl,
        ar: musicData.ar,
        url: `https://v1.itooi.cn/netease/url?id=${musicData.privilege.id}&quality=flac`
    })
}


// qq接口拼接歌手信息
function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach(item => {
        ret.push(item.name)
    })
    return ret.join('/')
}