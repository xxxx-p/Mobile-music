import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'
import axios from 'axios'
export function getSingerList() {
  const url = 'https://v1.itooi.cn/netease/artist/top'
  const data = {
    pageSize: 100,
    page: 0,
  }
  return axios.get(url, { params: data }).then(res => {
    return Promise.resolve(res.data)
  })
}
export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  })
  return jsonp(url, data, options)
}
