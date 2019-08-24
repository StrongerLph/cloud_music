import React, {Component} from 'react'
import {Button, Icon, InputItem, List, NavBar, Toast} from "antd-mobile"

class Register extends Component {
  state = {
    phone: '',
    password: ''
  }

  handlePhoneInputChange = (phone) => {
    this.setState({
      phone
    })
  }

  handlePasswordInputChange = (password) => {
    this.setState({
      password
    })
  }

  handleClickNext = () => {
    // 获取state中的手机号phoneNo,并去掉其中的空格
    const phone = this.state.phone.replace(/\s/g, '')
    const {password} = this.state
    // 验证手机号合法性
    if (!/^((1[3-8][0-9])+\d{8})$/.test(phone)) {
      Toast.fail('手机号不合法！')
      return
    }
    if (password.length < 6 || password.length > 16) {
      Toast.fail('密码必须大于等于6位小于等于16位数！')
      return
    }
    this.props.history.push({pathname: '/register-captcha', query: {phone, password}})
  }

  render() {
    return (
        <div style={{width: '100%', height: '100vh', background: '#fff'}}>
          <NavBar mode='light' icon={<Icon type='left' size='lg' color='#404040'/>} onLeftClick={() => this.props.history.goBack()}>注册账号</NavBar>
          <List style={{width: '80%', margin: '60px auto'}}>
            <InputItem type='phone' placeholder='输入手机号' clear={true} autoComplete='new-password' onChange={value => this.handlePhoneInputChange(value)}>手机号:</InputItem>
            <InputItem type='password' placeholder='输入密码' clear={true} autoComplete='new-password' onChange={value => this.handlePasswordInputChange(value)}>密　码:</InputItem>
          </List>
          <Button
              disabled={!this.state.phone && !this.state.password}
              onClick={() => {this.handleClickNext()}}
              style={{width: '75%', color: '#fff', borderRadius: '25px', margin: '40px auto', backgroundColor: '#00c800', selectable: 'none'}}>
            下一步
          </Button>
        </div>
    )
  }
}

export default Register
