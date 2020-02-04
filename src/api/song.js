import { commonParams } from './config'
import axios from 'axios'

export function getLyric(id) {
    const url = "api/lyric"
    const data = Object.assign({}, {
        id: id,
        format: 'json'
    })
    return axios.get(url, { params: data }).then(res => {
        return Promise.resolve(res.data)
    })
}