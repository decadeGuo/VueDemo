const URL = {
  LOGIN: '/login/',
  TEAINDEX: '/index/',
  DUDAO (id, type) {
    return `/update/dudao/?project_id=${id}&lx=${type}`
  }
}
export {URL}
