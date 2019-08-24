import React, {Component} from 'react'
import {Button, Icon} from 'antd-mobile'

import logo_login from '../../assets/logo_login.png'
import login_wx from '../../assets/login_wx.png'
import login_qq from '../../assets/login_qq.png'
import login_wyyx from '../../assets/login_wyyx.png'
import login_xlwb from '../../assets/login_xlwb.png'
import './login.css'


class Login extends Component {
  render () {
    return (
        <div style={{width: '100%', height: '100vh', background: '#db392c', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative'}}>
          <img src={logo_login} alt='logo' style={{width: '50px', height: '50px', marginTop: '150px'}}/>
          <div className="pulseInside"/>
          <div className="pulseOutside"/>
          <Button
            style={{width: '75%', color: '#db392c', borderRadius: '25px', selectable: 'none', marginTop: '200px'}}
            onClick={() => {this.props.history.push('/login-phone')}}
          >
            手机号登录
          </Button>
          <Button onClick={() => {this.props.history.push('/register')}} activeStyle={{color: 'rgb(255, 150, 150)'}} style={{background: '#db392c', width: '75%', color: '#fff', borderLeft: '1px solid #fff', borderRight: '1px solid #fff', borderRadius: '25px', selectable: 'none', marginTop: '10px'}}>
            注册账号
          </Button>
          <ul style={{width: '75%', display: 'flex', justifyContent: 'space-around', margin: '40px auto'}}>
            <li><img src={login_wx} alt="login_wx" style={{width: '40px', height: '40px'}}/></li>
            <li><img src={login_qq} alt="login_qq" style={{width: '40px', height: '40px'}}/></li>
            <li><img src={login_xlwb} alt="login_xlwb" style={{width: '40px', height: '40px'}}/></li>
            <li><img src={login_wyyx} alt="login_wyyx" style={{width: '40px', height: '40px'}}/></li>
          </ul>

          <span style={{fontSize: '12px', color: '#fff'}}><Icon type="check-circle-o" size='xxs' style={{verticalAlign: 'bottom'}}/> 同意<span style={{fontWeight: '600'}}>《服务条款》</span>和<span style={{fontWeight: '600'}}>《隐私政策》</span></span>
        </div>
    )
  }
}

export default Login
