import React, {Component} from 'react'
import {NavBar, Icon} from "antd-mobile"
import ReactPlayer from 'react-player'
import {connect} from 'react-redux'

import BodyPlayer from './BodyPlayer'
import {getSongListItem, getSongDetail, getLyric} from '../../api/default'
import {setCurrentMusic, setPlayList, setCurrentMusicIndex} from '../../store/actions'
import {parseLyric} from '../../utils/buildLyric/buildLyric'
import './player.css'

class Player extends Component {
  state = {
    showList: false,
    showLyrics: false,
    playStatus: false,
    currentMusic: {},
    progressDotLeft: 0,
    currentProgress: 0,
    currentPlaySeconds: '00:00',
    totalSeconds: '00:00',
    pMid: 5,
    currentMusicLyric: [],
    currentTime: 0
  }

  componentDidMount() {
    if (this.props.location.state.isAlive && JSON.parse(localStorage.getItem('playState'))) {
      return
    }
    getSongListItem(Number(this.props.match.params.id)).then(res => {
      const ids = res.playlist.trackIds.map(item => {
        return item.id
      })
      const query = ids.join(',')
      getSongDetail(query).then(res => {
        const playList = res.songs.map(item => {
          return {
            id: item.id,
            name: item.name,
            singer: item.ar.map(singer => singer.name).join('/'),
            album: item.al.name,
            albumImage: item.al.picUrl,
            url: 'https://music.163.com/song/media/outer/url?id=' + item.id
          }
        })
        this.props.setPlayList(playList)
        if (this.props.location.state && this.props.location.state.index >= 0) {
          this.props.setCurrentMusic(playList[this.props.location.state.index])
          this.props.setCurrentMusicIndex(this.props.location.state.index)
          this.handlePlayButton()
        } else if (this.props.location.state && this.props.location.state.isPlay) {
          this.props.setCurrentMusic(playList[0])
          this.props.setCurrentMusicIndex(0)
          this.handlePlayButton()
        } else {
          this.props.setCurrentMusic(playList[0])
          this.props.setCurrentMusicIndex(0)
        }
      }).catch(err => {
        throw err
      })
    }).catch(err => {
      throw err
    })
    localStorage.setItem('playState', JSON.stringify(this.state))
  }

  static computedSongLength(length) {
    let min = Math.floor(length / 60) > 0 ? Math.floor(length / 60) : 0
    let sec = Math.floor(length - min * 60)
    if (min < 10) {
      min = '0' + min
    }
    if (sec < 10) {
      sec = '0' + sec
    }
    return min + ':' + sec
  }

  computedTopAndIndex = (currentTime, currentMusicLyric) => {
    let currentIndex = 0
    for (let i = 0, len = currentMusicLyric.length; i < len; i++) {
      if (currentTime > currentMusicLyric[i][0]) {
        currentIndex = i
      } else {
        break
      }
    }
    let moveIndex = currentIndex > this.state.pMid ? (currentIndex - this.state.pMid) * 40 : 0
    let scrollTop = -moveIndex + 'px'
    return {
      currentIndex,
      scrollTop
    }
  }

  setLyric = (id) => {
    getLyric(id).then(res => {
      let currentMusicLyric = []
      if (!res.nolyric) {
        currentMusicLyric = parseLyric(res.lrc.lyric)
      }
      this.setState({
        currentMusicLyric
      })
    }).catch(err => {
      throw err
    })
  }

  showLyrics = () => {
    this.setLyric(this.props.currentMusic.id)
    this.setState({showLyrics: !this.state.showLyrics})
  }

  showList = () => {
    this.setState({
      showList: true
    })
  }

  closeList = () => {
    this.setState({
      showList: false
    })
  }

  handleProgress = (progress) => {
    const currentProgress = progress.played * 100
    this.setState({
      currentProgress,
      progressDotLeft: this.refs.progressEle.clientWidth,
      currentPlaySeconds: Player.computedSongLength(progress.playedSeconds),
      currentTime: progress.playedSeconds
    })
    localStorage.setItem('playState', JSON.stringify(this.state))
  }

  getTotalSeconds = (length) => {
    this.setState({
      totalSeconds: Player.computedSongLength(length)
    })
  }

  handlePlayButton = () => {
    if (!this.state.playStatus) {
      this.setState({playStatus: true})
      return
    }
    this.setState({playStatus: false})
  }

  // 下一首
  handleNextSong = () => {
    let changeIndex = this.props.currentMusicIndex + 1
    if (this.props.currentMusicIndex === this.props.playList.length - 1) {
      changeIndex = 0
    }
    this.props.setCurrentMusic(this.props.playList[changeIndex])
    this.props.setCurrentMusicIndex(changeIndex)
    if (this.state.showLyrics) {
      this.setLyric(this.props.playList[changeIndex].id)
    }
  }

  handlePrevSong = () => {
    let changeIndex = this.props.currentMusicIndex - 1
    if (this.props.currentMusicIndex === 0) {
      changeIndex = this.props.playList.length -1
    }
    this.props.setCurrentMusic(this.props.playList[changeIndex])
    this.props.setCurrentMusicIndex(changeIndex)
    if (this.state.showLyrics) {
      this.setLyric(this.props.playList[changeIndex].id)
    }
  }

  handlePlaySelectSong = (index) => {
    this.props.setCurrentMusic(this.props.playList[index])
    this.props.setCurrentMusicIndex(index)
    if (this.state.showLyrics) {
      this.setLyric(this.props.playList[index].id)
    }
    if (!this.state.playStatus) {
      this.handlePlayButton()
    }
    this.closeList()
  }

  render() {
    const {currentMusic} = this.props
    const {showLyrics, playStatus, currentTime, currentMusicLyric, showList} = this.state
    let computedTopAndIndex = this.computedTopAndIndex(currentTime, currentMusicLyric)
    let playPanel = null
    if (showLyrics) {
      playPanel = (
          <div onClick={() => {
            this.setState({showLyrics: !showLyrics})
          }} style={{
            width: '100%',
            height: '480px',
            marginBottom: '40px',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div
                style={{
                  width: '100%',
                  textAlign: 'center',
                  lineHeight: '40px',
                  marginTop: '30px',
                  color: '#b5a8a3',
                  position: 'absolute',
                  top: computedTopAndIndex.scrollTop
                }}
            >
              {
                currentMusicLyric.length ? currentMusicLyric.map((item, index) => {
                  let activeClass = index === computedTopAndIndex.currentIndex ? 'activeClass' : ''
                  return <p key={index} className={activeClass} index={index}>{item[1]}</p>
                }) : <p>暂无歌词</p>
              }
            </div>
          </div>
      )
    } else {
      playPanel = <div onClick={() => {
        this.showLyrics()
      }} style={{width: '100%', height: '520px'}}><BodyPlayer image={currentMusic.albumImage} isPlay={playStatus}/>
      </div>
    }
    let songList = null
    if (showList) {
      songList = (
          <div id='Pop' onClick={(e) => {e.target.id === 'Pop' && this.closeList()}} className='' style={{ position: 'fixed', top: 0, zIndex: 9, background: 'rgba(0, 0, 0, 0)', width: '100%', height: '100%'}}>
            <div style={{position: 'absolute', bottom: 0, background: 'rgba(0, 0, 0, 1)', width: '100%', height: '50%', borderRadius: '25px 25px 0 0'}}>
              <div style={{padding: '10px', color: '#fff', display: 'flex'}}>
                <i className='iconfont wy-icon-lbxh' style={{marginRight: '10px'}}/>
                <span>
                  随机播放
                </span>
                <div style={{width: '75%', display: 'flex', justifyContent: 'flex-end'}}>
                  <span style={{marginRight: '10px'}}>
                    收藏全部
                  </span>
                  <span>
                    del
                  </span>
                </div>
              </div>
              <div style={{height: '78%'}}>
                <ul onClick={(e) => {this.handlePlaySelectSong(Number(e.target.getAttribute("data-index")))}} style={{overflow: 'scroll', width: '100%', height: '100%'}}>
                  {
                    this.props.playList.map((item, index) => {
                      return (
                          <li data-index={index} key={item.id} style={{color: '#fff', padding: '10px', borderBottom: '1px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <span>
                              {item.name}
                              &nbsp;-&nbsp;
                              {item.singer}
                            </span>
                            <Icon type='cross'/>
                          </li>
                      )
                    })
                  }
                </ul>
              </div>
              <div onClick={() => {this.closeList()}} style={{width: '100%', position: 'fixed', bottom: 0, padding: '10px 0', textAlign: 'center', color: '#fff', background: '#000'}}>
                关闭
              </div>
            </div>
          </div>
      )
    }
    return (
        <div>
          <div>
            <img src={currentMusic.albumImage} alt="" style={{width: '100%', height: '100%', filter: 'blur(10px)', position: 'fixed', zIndex: '-1'}}/>
            <div style={{background: 'rgba(0, 0, 0, 0.5)'}}>
              <NavBar
                  style={{background: 'rgba(0, 0, 0, 0)', height: '53px'}}
                  mode="light"
                  onLeftClick={() => {
                    this.props.history.goBack()
                  }}
                  icon={<Icon type="left" color='#E5E3E5' size='lg'/>}
                  rightContent={
                    <i className='iconfont wy-icon-share'
                       style={{color: '#E5E3E5', fontSize: '24px', fontWeight: '300'}}/>
                  }
              >
                <div onClick={() => {
                  alert('跳转歌手主页')
                }} style={{height: '45px', margin: '0 auto', textAlign: 'center', color: '#E5E3E5'}}>
                  <div style={{fontSize: '16px', lineHeight: '22px'}}>
                    {currentMusic.name}
                  </div>
                  <div style={{fontSize: '12px', lineHeight: '22px'}}>
                <span>
                  {currentMusic.singer}
                </span>
                    <Icon type="right" size='xxs' style={{verticalAlign: 'middle'}}/>
                  </div>
                </div>
              </NavBar>
              {
                playPanel
              }
              <ReactPlayer onStart={() => {
                this.setLyric(currentMusic.id)
              }} onDuration={(length) => {
                this.getTotalSeconds(length)
              }} onProgress={(progress) => {
                this.handleProgress(progress)
              }} onEnded={() => {this.handleNextSong()}} url={currentMusic.url} playing={playStatus} style={{display: 'none'}}/>
              <div style={{fontSize: '12px', display: 'flex', justifyContent: 'space-around', color: '#E5E3E5'}}>
                <span>{this.state.currentPlaySeconds}</span>
                <div style={{width: '75%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <div style={{
                    display: 'inline-block',
                    width: '100%',
                    height: '1px',
                    background: 'rgba(255, 255, 255, 0.2)'
                  }}>
                    <div ref='progressEle' style={{
                      width: `${this.state.currentProgress + '%'}`,
                      height: '1px',
                      background: 'rgba(255, 255, 255, 0.5)',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: '9px',
                        height: '9px',
                        position: 'absolute',
                        top: '-4px',
                        left: `${this.state.progressDotLeft + 'px'}`,
                        borderRadius: '50%',
                        background: '#fff'
                      }}>
                      </div>
                    </div>
                  </div>
                </div>
                <span>{this.state.totalSeconds}</span>
              </div>
              <div style={{padding: '20px 0'}}>
                <ul style={{display: 'flex', justifyContent: 'space-around', height: '40px', color: '#E5E3E5'}}>
                  <li style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <i className='iconfont wy-icon-lbxh' style={{fontSize: '28px'}}/>
                  </li>
                  <li style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <i onClick={() => {this.handlePrevSong()}} className='iconfont wy-icon-prev-song' style={{fontSize: '28px'}}/>
                  </li>
                  <li style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <i onClick={() => {this.handlePlayButton()}} className={this.state.playStatus ? 'iconfont wy-icon-stop' : 'iconfont wy-icon-play'} style={{fontSize: '48px'}}/>
                  </li>
                  <li style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <i onClick={() => {this.handleNextSong()}} className='iconfont wy-icon-next-song' style={{fontSize: '28px'}}/>
                  </li>
                  <li style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <i onClick={() => {this.showList()}} className='iconfont wy-icon-play-list' style={{fontSize: '28px'}}/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {
            songList
          }
        </div>
    )
  }
}

const mapStateToProps = state => ({
  currentMusic: state.currentMusic,
  currentMusicIndex: state.currentMusicIndex,
  playList: state.playList
})

const mapDispatchToProps = dispatch => ({
  setPlayList: status => {
    dispatch(setPlayList(status))
  },
  setCurrentMusic: status => {
    dispatch(setCurrentMusic(status))
  },
  setCurrentMusicIndex: status => {
    dispatch(setCurrentMusicIndex(status))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)
