const URL = {
  LOGIN: '/login/',
  TEAINDEX: '/index/',
  DUDAO (id, type) {
    return `/update/dudao/?project_id=${id}&lx=${type}`
  },
  ANSWER (type) {
    return `/update/answer/?type=${type}`
  },
  WEIXIN (openid, type) {
    return `/update/weixin/?type=${type}&openid=${openid}`
  }
}
export {URL}
