import { getLyric } from 'api/song.js'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'
export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }

    getLyrics() {
        if (this.lyric) {
            return Promise.resovle(this.lyric)
        }
        return new Promise((resovle, reject) => {
            getLyric(this.mid).then(res => {
                if (res.retcode === ERR_OK) {
                    this.lyric = Base64.decode(res.lyric)
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
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400003LnSNo1ecdc3.m4a?guid=4196963732&vkey=021C0622A8DF9A54F281438ACB5CEC47A10CB6A6CCE59782BE339CDE8A8F5DB47575D63E420460F1180DB5A1FA274B566A08604B73F7C071&uin=0&fromtag=38`
        //   失效的歌曲地址  http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46
        // http://ws.stream.qqmusic.qq.com/C400001PLl3C4gPSCI.m4a?guid=6347447716&vkey=122C48D615303281DDC930486930EB89A5FC6FAAEED099D1E6339F6866AA4B83EA836250BDDCBE4A8CF65E054F135337D56A8BC1354254A9&uin=0&fromtag=38
    })
}



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