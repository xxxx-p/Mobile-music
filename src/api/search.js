import axios from 'axios'
import { commonParams, options } from './config'
export function getHotKey() {
    const url = "api/hotkey"
    const data = Object.assign({}, commonParams, {
        uin: 0,
        needNewCode: 1,
        platform: 'h5'
    })
    return axios.get(url, { params: data }).then(res => {
        return Promise.resolve(res.data)
    })
}
export function getSearch(keyword, type, pageSize, page) {
    const url = "api/search"
    const data = Object.assign({
        keyword, //关键词
        type,   //搜索类型
        pageSize,   //请求数量
        page    //请求分页
    })
    return axios.get(url, { params: data }).then(res => {
        return Promise.resolve(res.data)
    })
}
