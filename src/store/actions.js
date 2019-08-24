/*
*  数据管理--action文件
* */

import {
  LOGIN_WITH_PHONE,
  RECEIVE_USERINFO,
  SET_CURRENTMUSIC_INDEX,
  SET_CURRENTMUSIC,
  SET_PLAY_LIST
} from './actions-type'

import {loginWithPhone, getUserInfo} from '../api/default'

export function setCurrentMusic(currentMusic) {
  return {type: SET_CURRENTMUSIC, currentMusic}
}

export function setCurrentMusicIndex(currentMusicIndex) {
  return{type: SET_CURRENTMUSIC_INDEX, currentMusicIndex}
}

export function setPlayList(playList) {
  return {type: SET_PLAY_LIST, playList}
}
