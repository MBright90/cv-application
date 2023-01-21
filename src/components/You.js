import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from './Avatar'

// TODO: Validation functions for name, telephone number, area, image type

const AccountInput = (props) => {
  return (
    <div className="account-info-input">
      <label htmlFor={props.inputName}>{props.labelText}</label>
      <input
        type="text"
        maxLength="40"
        id={props.inputName}
        name={props.inputName}/>
    </div>
  )
}

AccountInput.propTypes = {
  inputName: PropTypes.string,
  labelText: PropTypes.string,
}

const AccountInfo = () => {
  return (
    <div className="account-info-overview">
      <AccountInput 
        inputName="account-input-name"
        labelText="Full Name "
      />
      <AccountInput 
        inputName="account-input-number"
        labelText="Contact Number "
      />
      <AccountInput
        inputName="account-input-email"
        labelText="Email "
      />
    </div>
  )
}

const AccountAvatar = (props) => {
  // TODO: create function to pass uploaded image back to server



  return (
    <div className="avatar-edit-overview">
      <Avatar imgSource={props.imgSource}/>
      <label htmlFor="avatar-img-upload">
        <input
          id="avatar-img-upload"
          type="file"
          accept="image/png, image/jpeg, image/jpg, .svg"
          onChange={props.handleAvatarUpload}/>
        <i className="fa fa-cloud-upload"></i> Change Image
      </label>
      
    </div>
  )
}

AccountAvatar.propTypes = {
  handleAvatarUpload: PropTypes.func,
  imgSource: PropTypes.string,
}

export default class You extends Component {
  constructor(props) {
    super(props)

    this.handleAvatarUpload = this.handleAvatarUpload.bind(this)
  }

  handleAvatarUpload(e) {
    this.props.uploadAvatarChange(e.target.files[0])
  }

  render() {
    return (
      <main>
        <div className="you-page-overview">
          <AccountAvatar 
            imgSource={this.props.userInfo.avatarImg}
            handleAvatarUpload={this.handleAvatarUpload}/>
          <AccountInfo />
        </div>
      </main>
    )
  }
}

You.propTypes = {
  uploadAvatarChange: PropTypes.func,
  userInfo: PropTypes.object,
}