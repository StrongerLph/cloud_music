import React, {Component} from 'react'
import {Icon, NavBar} from 'antd-mobile'

import './index.css'
import {getSongListDetail} from '../../api/default'

class SongListDetail extends Component {
  state = {
    songListDetail: {}
  }

  componentDidMount() {
    getSongListDetail(this.props.match.params.id).then(res => {
      const songListDetail = res.playlist
      this.setState({
        songListDetail
      })
    }).catch(err => {
      throw err
    })
  }

  render() {
    const {songListDetail} = this.state
    return (
        <div style={{background: 'rgba(0, 0, 0, 0.5)', overflow: 'hidden'}}>
          <NavBar
              style={{background: 'rgba(0, 0, 0, 0)', height: '53px'}}
              mode="light"
              onLeftClick={() => {
                this.props.history.goBack()
              }}
              icon={<Icon type="left" color='#E5E3E5' size='lg'/>}
              rightContent={
                <Icon type="ellipsis" color='#E5E3E5' onClick={() => {
                  this.props.history.push({pathname: '/player/0', state: {isAlive: true}})
                }}/>
              }
          >
            <div style={{height: '45px', lineHeight: '45px', margin: '0 auto', textAlign: 'center', color: '#E5E3E5'}}>
              歌单
            </div>
          </NavBar>
          <div style={{height: '614px', overflow: 'scroll'}}>
            <div style={{display: 'flex', margin: '10px 15px'}}>
              <img className='songlist-img' src={songListDetail.coverImgUrl} alt=""/>
              <div>
              <span style={{color: '#fff', lineHeight: '20px'}}>
                {songListDetail.name}
              </span>
                <div style={{display: 'flex', alignItems: 'center', margin: '20px 0'}}>
                  <img src={songListDetail.creator && songListDetail.creator.avatarUrl} alt=""
                       style={{width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px'}}/>
                  <span style={{color: '#E5E3E5'}}>
                  {
                    songListDetail.creator && songListDetail.creator.nickname
                  }
                </span>
                  <Icon type="right" color='#E5E3E5'/>
                </div>
                <span className='songlist-word-over'>
                {songListDetail.description}
              </span>
              </div>
            </div>
            <ul className='songlist-btn-list'>
              <li><i className='iconfont wy-iconpl'/></li>
              <li><i className='iconfont wy-icon-share'/></li>
              <li><i className='iconfont wy-icon-download'/></li>
              <li><i className='iconfont wy-iconpl'/></li>
            </ul>
            <div>
              <div style={{display: 'flex', alignItems: 'center', padding: '10px', justifyContent: 'space-between', color: '#fff'}}>
                <div style={{display: 'flex', alignItems: 'center', width: '60%'}} onClick={() => {this.props.history.push({pathname: '/player/' + songListDetail.id, state: {isPlay: true}})}}>
                  <i className='iconfont wy-icon-play' style={{fontSize: '28px', marginRight: '10px'}}/>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                  <span>
                    播放全部
                  </span>
                    <span style={{fontSize: '12px'}}>
                    (共{songListDetail.tracks && songListDetail.tracks.length}首)
                  </span>
                  </div>
                </div>
                <button
                    style={{padding: '10px', fontSize: '14px', border: 0, borderRadius: '25px', background: '#75c936', color: '#fff'}}>
                  + 收藏({songListDetail.subscribedCount})
                </button>
              </div>
              <ul>
                {
                  songListDetail.tracks && songListDetail.tracks.map( (item, index) => {
                    return (
                        <li  onClick={() => {this.props.history.push({pathname: `/player/${this.props.match.params.id}`, state: {index: index}})}} key={item.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px auto'}}>
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{ margin: '0 15px', color: '#E5E3E5'}}>{index + 1}</span>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                              <span style={{color: '#fff'}}>{item.name}</span>
                              <span style={{color: '#E5E3E5'}}>{item.ar.map(singer => singer.name).join('/')}</span>
                            </div>
                          </div>
                          <i className='iconfont wy-icon-song-detial' style={{color: '#E5E3E5', marginRight: '15px'}}/>
                        </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
    )
  }
}

export default SongListDetail
