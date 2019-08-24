import React, {Component} from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import {SearchBar, TabBar} from "antd-mobile";

import Header from '../../components/Header/Header'
import Discovery from '../Discovery/Discovery'
import Video from '../Video/Video'
import Mine from '../Mine/Mine'
import YunCun from '../YunCun/YunCun'
import User from '../User/User'

class MainView extends Component {
  state = {
    currentPath: '/main-view/discovery'
  }

  componentDidMount() {
    this.setState({
      currentPath: this.props.location.pathname
    })
  }

  changePage = (path) => {
    this.setState({currentPath: path})
    this.props.history.replace(path)
  }
  render() {
    const icon = <i className='iconfont wy-icon-soundhound' style={{fontSize: '24px', textAlign: 'center', margin: '10px 0 0 10px', color: '#e5e3e5'}}/>
    const middle = <SearchBar cancelText={<span style={{color: '#e5e3e5'}}>取消</span>} placeholder='此处动态切换占位' style={{background: 'rgba(0, 0, 0, 0)'}}/>
    return (
        <div style={{background: 'rgba(0, 0, 0, 0.3)'}}>
          <Header style={{position: 'fixed', zIndex: 9, top: 0}} icon={icon} middle={middle} handelClick={() => {this.props.history.push({pathname: '/player/0/0', state: {isAlive: true}})}}/>
          <div style={{height: '575px', overflow: 'scroll'}}>
            <Switch>
              <Route path='/main-view/discovery' component={Discovery}/>
              <Route path='/main-view/video' component={Video}/>
              <Route path='/main-view/mine' component={Mine}/>
              <Route path='/main-view/yun-cun' component={YunCun}/>
              <Route path='/main-view/user' component={User}/>

              <Redirect to='/main-view/discovery'/>
            </Switch>
          </div>
          <div style={{position: 'fixed', zIndex: '9', bottom: '0', width: '100%'}}>
            <TabBar barTintColor='rgba(0, 0, 0, 0.3)' tintColor='#81c742' unselectedTintColor='#e5e3e5'>
              <TabBar.Item
                  title='发现'
                  selected={this.state.currentPath === '/main-view/discovery' || this.state.currentPath === '/main-view'}
                  onPress={() => {this.changePage('/main-view/discovery')}}
                  icon={<i className='iconfont wy-icon-find' style={{fontSize: '22px'}}/>}
                  selectedIcon={<i className='iconfont wy-icon-find' style={{fontSize: '26px', color: '#81c742'}}/>}
              />
              <TabBar.Item
                  title='视频'
                  selected={this.state.currentPath === '/main-view/video'}
                  onPress={() => {this.changePage('/main-view/video')}}
                  icon={<i className='iconfont wy-icon-video' style={{fontSize: '22px'}}/>}
                  selectedIcon={<i className='iconfont wy-icon-video' style={{fontSize: '26px', color: '#81c742'}}/>}
              />
              <TabBar.Item
                  title='我的'
                  selected={this.state.currentPath === '/main-view/mine'}
                  onPress={() => {this.changePage('/main-view/mine')}}
                  icon={<i className='iconfont wy-icon-mine' style={{fontSize: '22px'}}/>}
                  selectedIcon={<i className='iconfont wy-icon-mine' style={{fontSize: '26px', color: '#81c742'}}/>}
              />
              <TabBar.Item
                  title='云村'
                  selected={this.state.currentPath === '/main-view/yun-cun'}
                  onPress={() => {this.changePage('/main-view/yun-cun')}}
                  icon={<i className='iconfont wy-icon-yuncun' style={{fontSize: '22px'}}/>}
                  selectedIcon={<i className='iconfont wy-icon-yuncun' style={{fontSize: '26px', color: '#81c742'}}/>}
              />
              <TabBar.Item
                  title='账号'
                  selected={this.state.currentPath === '/main-view/user'}
                  onPress={() => {this.changePage('/main-view/user')}}
                  icon={<i className='iconfont wy-icon-user' style={{fontSize: '22px'}}/>}
                  selectedIcon={<i className='iconfont wy-icon-user' style={{fontSize: '26px', color: '#81c742'}}/>}
              />
            </TabBar>
          </div>
        </div>
    )
  }
}

export default MainView
