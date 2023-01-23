import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from './Avatar'
import SaveButton from './SaveButton'

// TODO: Validation functions for name, telephone number, area, image type

const AccountInput = (props) => {
  return (
    <div className="account-info-input">
      <label htmlFor={props.inputName}>{props.labelText}</label>
      <input
        type="text"
        maxLength="40"
        id={props.inputName}
        name={props.inputName}
        defaultValue={props.currentInfo}/>
    </div>
  )
}

AccountInput.propTypes = {
  currentInfo: PropTypes.string,
  inputName: PropTypes.string,
  labelText: PropTypes.string,
}

const AccountInfo = (props) => {
  return (
    <form className="account-info-overview">
      <AccountInput 
        inputName="account-input-first-name"
        labelText="First Name(s) "
        currentInfo={props.userInfo.firstName}
      />
      <AccountInput 
        inputName="account-input-surname"
        labelText="Surname "
        currentInfo={props.userInfo.surname}
      />
      <AccountInput
        inputName="account-input-email"
        labelText="Email "
        currentInfo={props.userInfo.email}
      />
      <AccountInput 
        inputName="account-input-number"
        labelText="Contact Number "
        currentInfo={props.userInfo.contactNumber}
      />
      <SaveButton 
        uploadAccountInfo={props.uploadAccountInfo}
      />
    </form>
  )
}

AccountInfo.propTypes = {
  uploadAccountInfo: PropTypes.func,
  userInfo: PropTypes.object
}

const AccountAvatar = (props) => {
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
          <AccountInfo 
            uploadAccountInfo={this.props.uploadAccountInfo}
            userInfo={this.props.userInfo}/>
        </div>
      </main>
    )
  }
}

You.propTypes = {
  uploadAccountInfo: PropTypes.func,
  uploadAvatarChange: PropTypes.func,
  userInfo: PropTypes.object,
}