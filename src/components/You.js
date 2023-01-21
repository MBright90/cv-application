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
          accept="image/png, image/jpeg, image/jpg, .svg"/>
        <i className="fa fa-cloud-upload"></i> Change Image
      </label>
      
    </div>
  )
}

AccountAvatar.propTypes = {
  imgSource: PropTypes.string
}

export default class You extends Component {
  render() {
    return (
      <main>
        <div className="you-page-overview">
          <AccountAvatar imgSource={this.props.userInfo.imgSource}/>
          <AccountInfo />
        </div>
      </main>
    )
  }
}

You.propTypes = {
  userInfo: PropTypes.object
}