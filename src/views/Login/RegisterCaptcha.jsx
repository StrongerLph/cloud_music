import React, {Component} from 'react'
import {Button, Icon, InputItem, List, NavBar, Modal, Toast} from "antd-mobile"

import { getCaptcha, registerUser } from "../../api/default"

class RegisterCaptcha extends Component {
  state = {
    captcha: '',
    isTimeOver: false
  }

  componentDidMount() {
    this.requestCaptcha()
  }

  requestCaptcha = () => {
    // 发请求获取短信验证码
    this.countDown()
    getCaptcha(this.props.location.query.phone).then(res => {
      Toast.success('验证码已发送，请注意查收！')
    }).catch(err => {
      this.setState({
        time: 60,
        isTimeOver: true
      })
      throw err
    })
  }

  countDown = () => {
    this.setState({
      time: 60,
      isTimeOver: false
    })
    const timeId = setInterval(() => {
      let time = this.state.time
      if (time <= 0) {
        this.setState({
          isTimeOver: true
        })
        clearInterval(timeId)
        return
      }
      time -= 1
      this.setState({
        time
      })
    }, 1000)
  }

  handleInputChange = (captcha) => {
    this.setState({
      captcha
    })
  }

  handleRegister = () => {
    const {captcha} = this.state
    const {phone, password} = this.props.location.query
    const data = {
      phone,
      password,
      captcha,
      nickname: phone + ''
    }
    registerUser(data).then(res => {
      Modal.alert('注册成功！', '是否前往登录？',[{text: '否', onPress: () => this.props.history.replace('/login'), style: 'default'},
        {text: '是', onPress: () => this.props.history.replace('/login-phone')},
      ])
    }).catch(err => {
      throw err
    })
  }

  handleResend = () => {
    // 重新请求验证码
    this.requestCaptcha()
  }

  render() {
    return (
        <div style={{width: '100%', height: '100vh', background: '#fff'}}>
          <NavBar mode='light' icon={<Icon type='left' size='lg' color='#404040'/>} onLeftClick={() => this.props.history.goBack()}>手机号验证</NavBar>
          <span style={{display: 'block', padding: '0 15px', color: '#cdcace', marginTop: '40px'}}>验证码已发送至</span>
          <span style={{display: 'block', padding: '0 15px', color: '#cdcace', margin: '10px 0 40px 0'}}>
            +86 &nbsp;{18163976253}
            <span style={{float: 'right'}}>
              {this.state.isTimeOver ? <span style={{color: '#48b4e0'}} onClick={() => {this.handleResend()}}>重新发送</span> : this.state.time + 's'}
            </span>
          </span>
          <List style={{border: 0}}>
            <InputItem
                type='number'
                placeholder='输入验证码'
                maxLength={4}
                clear={true}
                onChange={value => this.handleInputChange(value)}
                style={{border: 0}}
            />
          </List>
          <Button
              disabled={!this.state.captcha.length}
              onClick={() => {this.handleRegister()}}
              style={{width: '75%', color: '#fff', borderRadius: '25px', margin: '40px auto', backgroundColor: '#00c800', selectable: 'none'}}>
            注册并登录
          </Button>
        </div>
    )
  }
}

export default RegisterCaptcha
