import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from './Avatar'

const AccountInfo = (props) => {
  console.log(props)
}

export default class You extends Component {
  render() {
    return (
      <div className="you-overview">
        <Avatar imgSource={this.props.userInfo.imgSource}/>
        <AccountInfo />
      </div>
    )
  }
}

You.propTypes = {
  userInfo: PropTypes.object
}