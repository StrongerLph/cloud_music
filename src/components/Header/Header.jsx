import React, { Component } from 'react'
import {Icon} from "antd-mobile";

class Header extends Component {
  render() {
    const {icon, handelClick, middle} = this.props
    return (
        <div style={{width: '100%', display: 'flex', background: 'rgba(255, 255, 255, 0)'}}>
          {
            icon
          }
          <div style={{width: '75%'}}>
            {
              middle
            }
          </div>
          <Icon
              type='ellipsis'
              color='#e5e3e5'
              onClick={handelClick}
              style={{margin: '12px 0 0 8px'}}
          />
        </div>
    )
  }
}

export default Header
