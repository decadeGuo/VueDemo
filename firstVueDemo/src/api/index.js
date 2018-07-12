export {URL} from './url'

import Axios from 'axios'

export const api = { // 优先使用get2、post2，最后需要统一更改
  get (url) { // get请求
    console.log(URI)
    console.log(dealUrl(url))
    return Axios.get(dealUrl(url))
  },
  post (url, data = {}) { // post请求
    return Axios.post(dealUrl(url), data)
  }
}

function dealUrl (url) {
  if (!url) {
    console.log('url未定义', 'api')
    return
  }
  if (url.indexOf('?') === -1) {
    url += '?vue=true&type=' + localStorage.getItem('type') + '&sessionid=' + localStorage.getItem('sessionid')
  } else {
    url += '&vue=true&type=' + localStorage.getItem('type') + '&sessionid=' + localStorage.getItem('sessionid')
  }
  return url
}
