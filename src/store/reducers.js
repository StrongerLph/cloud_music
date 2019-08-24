import {combineReducers} from 'redux'

import {
  SET_PLAY_LIST,
  SET_CURRENTMUSIC,
  SET_CURRENTMUSIC_INDEX
} from './actions-type'

const initialState = {
  playList: [],
  currentMusic: {},
  currentMusicIndex: 0
}

function playList(playList = initialState.playList, action) {
  if (action.type === SET_PLAY_LIST) {
    return action.playList
  } else {
    return playList
  }
}

export function currentMusic(currentMusic = initialState.currentMusic, action) {
  if (action.type === SET_CURRENTMUSIC) {
    return action.currentMusic
  } else {
    return currentMusic
  }
}

export function currentMusicIndex(currentMusicIndex = initialState.currentMusicIndex, action) {
  if (action.type === SET_CURRENTMUSIC_INDEX) {
    return action.currentMusicIndex
  } else {
    return currentMusicIndex
  }
}

export default combineReducers({
  playList,
  currentMusic,
  currentMusicIndex
})
