import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'
import axios from 'axios'

//轮播接口，需要模拟webpack dev中的请求头端口
export function getRecommend() {
  const url = 'api/getRecommend'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getDiscList() {
  const url = 'api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}