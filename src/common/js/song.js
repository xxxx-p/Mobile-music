import { getLyric } from 'api/song.js'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'
export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id
        // this.mid = mid
        this.singer = singer
        this.name = name
        // this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }

    getLyrics() {
        if (this.lyric) {
            return Promise.resovle(this.lyric)
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
        url: `https://v1.itooi.cn/netease/url?id=${musicData.privilege.id}&quality=flac`
    })
}


//qq接口拼接歌手信息，网易云不用
// function filterSinger(singer) {
//     let ret = []
//     if (!singer) {
//         return ''
//     }
//     singer.forEach(item => {
//         ret.push(item.name)
//     })
//     return ret.join('/')
// }