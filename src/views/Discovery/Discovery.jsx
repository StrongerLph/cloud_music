import React, {Component} from 'react'
import {Carousel, Badge} from 'antd-mobile'

import {getCarouselList, getRecommendPlayList, getNewDiscsList, getNewSongsList} from "../../api/default"
import './index.css'

import dailyRecommendation from '../../assets/mrtj.png'
import songList from '../../assets/gd.png'
import rankingList from '../../assets/phb.png'
import radio from '../../assets/dt.png'
import live from '../../assets/zb.png'


class Discovery extends Component {
  state = {
    carouselList: [],
    recommendPlayList: [],
    newDiscsOrSongs: [],
    newTitle: ''
  }

  componentDidMount() {
    this.setCarouselList()
    this.setRecommendPlayList()
    this.handleClickNewDisc()
  }

  // 设置轮播数据
  setCarouselList = () => {
    getCarouselList().then(res => {
      const carouselList = res.banners
      this.setState({
        carouselList
      })
    }).catch(err => {
      throw err
    })
  }
  // 设置推荐歌单
  setRecommendPlayList = () => {
    getRecommendPlayList().then(res => {
      const recommendPlayList = this.getArrayItems(res.result, 6)
      this.setState({
        recommendPlayList
      })
    }).catch(err => {
      throw err
    })
  }
  // 获取并设置新碟数据
  handleClickNewDisc = () => {
    this.refs.newSong.style.fontSize = '14px'
    this.refs.newDisc.style.fontSize = '18px'
    this.setState({
      newTitle: '更多新碟'
    })
    const offset =0
    const limit = 30
    getNewDiscsList({offset, limit}).then(res => {
      const newDiscs = this.getArrayItems(res.albums, 3)
      this.setState({newDiscsOrSongs: newDiscs})
    }).catch(err => {
      throw err
    })
  }
  // 获取并设置新歌数据
  handleClickNewSong = () => {
    this.refs.newSong.style.fontSize = '18px'
    this.refs.newDisc.style.fontSize = '14px'
    this.setState({
      newTitle: '新歌推荐'
    })
    getNewSongsList().then(res => {
      const newSongs = this.getArrayItems(res.result, 3)
      this.setState({
        newDiscsOrSongs: newSongs
      })
    }).catch(err => {
      throw err
    })
  }

  //从一个给定的数组arr中,随机返回num个不重复项
  getArrayItems = (arr, num) => {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    const temp_array = [];
    for (const index in arr) {
      temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    const return_array = [];
    for (let i = 0; i<num; i++) {
      //判断如果数组还有可以取出的元素,以防下标越界
      if (temp_array.length>0) {
        //在数组中产生一个随机索引
        const arrIndex = Math.floor(Math.random() * temp_array.length);
        //将此随机索引的对应的数组元素值复制出来
        return_array[i] = temp_array[arrIndex];
        //然后删掉此索引的数组元素,这时候temp_array变为新的数组
        temp_array.splice(arrIndex, 1);
      } else {
        //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
        break;
      }
    }
    return return_array;
  }

  render() {
    return (
        <div>
          <Carousel
            infinite={true}
            autoplay={true}
            cellSpacing={1}
            style={{width: '90%', margin: '10px auto'}}
          >
            {this.state.carouselList.map((item, index) => (
                <div key={index} style={{position: 'relative'}}>
                  <a
                      href="https://music.163.com"
                      style={{ display: 'inline-block', width: '100%', height: '150px' }}
                  >
                    <img
                        src={item.imageUrl}
                        alt={item.imageUrl}
                        style={{ width: '100%', verticalAlign: 'top', height: '150px', borderRadius: '10px' }}
                    />
                  </a>
                  <Badge text={item.typeTitle} style={{float: 'right', position: 'absolute', top: '122px', right: '0px'}}/>
                </div>
            ))}
          </Carousel>
            <ul style={{width: '100%', height: '50px', display: 'flex', justifyContent: 'space-around'}}>
              <li><img src={dailyRecommendation} alt="" style={{width: '40px', height: '40px', borderRadius: '50%', marginTop: '5px'}}/></li>
              <li><img src={songList} alt="" style={{width: '40px', height: '40px', borderRadius: '50%', marginTop: '5px'}}/></li>
              <li><img src={rankingList} alt="" style={{width: '40px', height: '40px', borderRadius: '50%', marginTop: '5px'}}/></li>
              <li><img src={radio} alt="" style={{width: '40px', height: '40px', borderRadius: '50%', marginTop: '5px'}}/></li>
              <li><img src={live} alt="" style={{width: '40px', height: '40px', borderRadius: '50%', marginTop: '5px'}}/></li>
            </ul>
          <div style={{width: '100%', height: '50px', color: '#e5e3e5'}}>
            <span style={{display: 'inline-block', width: '80px', fontSize: '18px', marginTop: '16px', marginLeft: '22px'}}>推荐歌单</span>
            <span style={{width: '70px', lineHeight: '20px', textAlign: 'center', float: 'right', margin: '16px 22px 0 0', border: '1px solid #7e747e', borderRadius: '25px'}}>歌单广场</span>
          </div>
          <ul style={{width: '330px', overflow: 'hidden', margin: '0 auto'}}>
            {
              this.state.recommendPlayList.map((item, index) => {
                return (
                    <li key={index} className='play-list-item' onClick={() => {this.props.history.push({pathname: `/song-list-detail/${item.id}`})}}>
                      <img src={item.picUrl} alt={item.name} style={{width: '100px', height: '100px', borderRadius: '8px'}}/>
                      <span className='word-over' style={{color: '#e5e3e5'}}>{item.name}</span>
                    </li>
                )
              })
            }
          </ul>
          <div style={{width: '100%', height: '50px', color: '#e5e3e5'}}>
            <span style={{display: 'inline-block', width: '100px', fontSize: '18px', marginTop: '16px', marginLeft: '22px'}}>
              <span ref='newDisc' onClick={() => {this.handleClickNewDisc()}} style={{fontSize: '14px'}}>新碟</span>
              <span style={{display: 'inline-block', width: '24px', textAlign: 'center', fontSize: '16px', fontWeight: '300'}}>|</span>
              <span ref='newSong' onClick={() => {this.handleClickNewSong()}} style={{fontSize: '14px'}}>新歌</span>
            </span>
            <span style={{width: '70px', lineHeight: '20px', textAlign: 'center', float: 'right', margin: '16px 22px 0 0', border: '1px solid #7e747e', borderRadius: '25px'}}>{this.state.newTitle}</span>
          </div>
          <ul style={{width: '330px', overflow: 'hidden', margin: '10px auto'}}>
            {
              this.state.newDiscsOrSongs.map((item, index) => {
                return (
                    <li key={index} className='play-list-item'>
                      <img src={item.picUrl || item.song.album.picUrl} alt={item.name} style={{width: '100px', height: '100px', borderRadius: '8px'}}/>
                      <span className='word-over' style={{color: '#e5e3e5'}}>{item.name}</span>
                    </li>
                )
              })
            }
          </ul>
        </div>
    )
  }
}

export default Discovery
