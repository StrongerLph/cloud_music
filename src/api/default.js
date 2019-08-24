import request from '../utils/request'

// 手机号验证码登录------------------------------
// 获取验证码
export function getCaptcha(phone) {
  return request({
    url: '/captcha/sent?phone=' + phone,
    method: 'get'
  })
}

// 验证
// export function loginIn(phone, captcha) {
//   return request({
//     url: '/captcha/verify',
//     method: '',
//     params: {
//       phone,
//       captcha
//     }
//   })
// }

// 注册
export function registerUser(data) {
  return request({
    url: '/register/cellphone',
    method: 'get',
    params: data
  })
}

// 手机号密码登录
export function loginWithPhone(data) {
  return request({
    url: '/login/cellphone',
    method: 'get',
    params: data
  })
}

// 获取用户信息
export function getUserInfo(userId) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: {
      uid: userId
    }
  })
}

// 获取发现页轮播列表
export function getCarouselList(type = 0) {
  return request({
    url: '/banner?type=' + type,
    method: 'get'
  })
}

// 获取推荐歌单列表数据
export function getRecommendPlayList() {
  return request({
    url: '/personalized',
    method: 'get'
  })
}

// 新碟
export function getNewDiscsList(data) {
  return request({
    url: '/top/album',
    method: 'get',
    params: data
  })
}

// 获取新歌
export function getNewSongsList() {
  return request({
    url: 'personalized/newsong',
    method: 'get'
  })
}

// 获取歌单详情（歌单中所有歌曲）
export function getSongListItem(id) {
  return request({
    url:'/playlist/detail?id=' + (id || 2856376202),
    method: 'get'
  })
}

// 获取歌曲详情
export function getSongDetail(songId) {
  return request({
    url: '/song/detail?ids=' + songId,
    method: 'get'
  })
}

// 获取歌词
export function getLyric(id) {
  return request({
    url: '/lyric',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取歌单详情
export function getSongListDetail(songListId) {
  return request({
    url: '/playlist/detail',
    method: 'get',
    params: {
      id: songListId
    }
  })
}
