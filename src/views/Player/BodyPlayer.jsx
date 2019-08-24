import React from 'react'
// import PropTypes from 'prop-types'
import classNames from 'classnames'

import './bodyplayer.css'

const BodyPlayer = props => {
  const { isPlay, image } = props
  return (
      <div className={classNames('player-cd', { pause: !isPlay })}>
        <div className="needle"/>
        <div className="disc-box">
          <div className="disc" />
          <img src={image} alt="" />
        </div>
      </div>
  )
}

// BodyPlayer.propTypes = {
//   isPlay: PropTypes.bool.isRequired, // 播放状态
//   image: PropTypes.string.isRequired // 当前音乐图片
// }

export default BodyPlayer
