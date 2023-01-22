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

class SaveInfoButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMessage: '',
    }

    this.notifySave = this.notifySave.bind(this)
  }

  #clearNotification = () => {
    // Clear the success notification after three seconds
    this.timerID = setTimeout(() => {
      this.setState({
        currentMessage: ''
      })
    }, 3000)
  }

  notifySave = (message) => {
    this.setState({
      currentMessage: message
    })
    this.#clearNotification()
  }

  collectFormData = (e) => {
    // Retrieve all inputs in the account info container and return an object of values to
    // the App component
    e.preventDefault()
    const inputArr = [...e.target.parentNode.parentNode.querySelectorAll('input[type=text]')]
    const inputValues = inputArr.map((inputField) => inputField.value)
    this.props.uploadAccountInfo({
      name: inputValues[0],
      email: inputValues[1],
      contactNumber: inputValues[2],
    })
  }

  render() {
    return (
      <div className="save-button-container">
        <button 
          className="save-button"
          type="submit"
          onClick={(e) => {
            this.collectFormData(e)
            this.notifySave('Update Successful')
          }}
        >Update</button>
        <p>{this.state.currentMessage}</p>
      </div>
    )
  }
}

SaveInfoButton.propTypes = {
  uploadAccountInfo: PropTypes.func
}

AccountInput.propTypes = {
  inputName: PropTypes.string,
  labelText: PropTypes.string,
}

const AccountInfo = (props) => {
  return (
    <form className="account-info-overview">
      <AccountInput 
        inputName="account-input-name"
        labelText="Full Name "
      />
      <AccountInput
        inputName="account-input-email"
        labelText="Email "
      />
      <AccountInput 
        inputName="account-input-number"
        labelText="Contact Number "
      />
      <SaveInfoButton 
        uploadAccountInfo={props.uploadAccountInfo}
      />
    </form>
  )
}

AccountInfo.propTypes = {
  uploadAccountInfo: PropTypes.func
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
    this.props.uploadAvatarChange(URL.createObjectURL(e.target.files[0]))
  }

  render() {
    return (
      <main>
        <div className="you-page-overview">
          <AccountAvatar 
            imgSource={this.props.userInfo.avatarImg}
            handleAvatarUpload={this.handleAvatarUpload}/>
          <AccountInfo 
            uploadAccountInfo={this.props.uploadAccountInfo}/>
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