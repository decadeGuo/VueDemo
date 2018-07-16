import Axios from 'axios'
import Router from '../router/index'
export {URL} from './url'

export const api = { // 优先使用get2、post2，最后需要统一更改
  get (url) { // get请求
    console.log(URI)
    console.log(dealUrl(url))
    return Axios.get(dealUrl(url))
    // Axios.get(dealUrl(url)).then(res => {
    //   if (res.data.data == 0) {
    //     localStorage.removeItem('sessionid')
    //     localStorage.removeItem('type')
    //     localStorage.removeItem('uid')
    //     this.$router.push('/')
    //   } else {
    //     return res
    //   }
    // })
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
    url += '?vue=true&radio=' + localStorage.getItem('type') + '&sessionid=' + localStorage.getItem('sessionid')
  } else {
    url += '&vue=true&radio=' + localStorage.getItem('type') + '&sessionid=' + localStorage.getItem('sessionid')
  }
  return url
}
// Axios.interceptors.response.use(function (response) {
//   if (response.data.status == 0) {
//     localStorage.removeItem('sessionid')
//     localStorage.removeItem('type')
//     localStorage.removeItem('uid')
//     this.$router.push('/')
//   } else {
//     return response
//   }
// })
Axios.interceptors.response.use(function (response) {
  let resultData = response.data // 取出json数据
  if (resultData.status === 1) {
    return Promise.resolve(resultData)// 在此处直接将json内的data取出
  } else { // resultData.response === 'fail'
    localStorage.removeItem('sessionid')
    localStorage.removeItem('type')
    localStorage.removeItem('uid')
    console.log(resultData.message)
    Router.replace('/?o=' + resultData.message)
  }
})
