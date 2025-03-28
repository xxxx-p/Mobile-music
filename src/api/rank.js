import axios from 'axios'

export function getTopList() {
  const url = 'api/TopList'
  const data = {
    pageSize: 100,
    page: 0,
  }
  return axios.get(url, { params: data }).then(res => {
    return Promise.resolve(res.data)
  })
}
export function getMusicList(topid) {
  const url = 'api/MusicList'
  const data = {
    id: topid,
    pageSize:200
  }
  return axios.get(url, { params: data }).then(res => {
    return Promise.resolve(res.data)
  })
}