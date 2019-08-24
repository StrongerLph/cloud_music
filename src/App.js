import React, { Component } from 'react'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'

import './App.css'
import Login from './views/Login/Login'
import LoginWithPhoneNo from './views/Login/LoginWithPhoneNo'
import Register from './views/Login/Register'
import RegisterCaptcha from './views/Login/RegisterCaptcha'
import MainView from './views/MainView/MainView'
import Player from './views/Player/Player'
import SongListDetail from './views/SongList/SongListDetail'

import backgroundImg from './assets/images/background-img.jpg'

// import mapStateToProps from "react-redux/es/connect/mapStateToProps";

class App extends Component {
  render() {
    return (
        <div>
          <img src={backgroundImg} alt="" style={{width: '100%', height: '100%', filter: 'blur(1px)', position: 'fixed', zIndex: '-1'}}/>
          <HashRouter>
            <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/login-phone' component={LoginWithPhoneNo}/>
              <Route path='/register' component={Register}/>
              <Route path='/register-captcha' component={RegisterCaptcha}/>
              <Route path='/main-view' component={MainView}/>
              <Route path='/player/:id' component={Player}/>
              <Route path='/song-list-detail/:id' component={SongListDetail}/>
              <Redirect to='/login'/>
            </Switch>
          </HashRouter>
        </div>
    )
  }
}

export default App
