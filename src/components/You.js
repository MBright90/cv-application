import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from './Avatar'
import { ResetButton, SaveInfoButton } from './Buttons'
import { ResetInfoModal } from './Modals'

// TODO: Validation functions for name, telephone number, area, image type

const ReferenceInfo = (props) => {

  const handleValueChange = (e) => {
    props.validateInput(e.target)
  }

  return (
    <form className="reference-input-overview">
      <fieldset>
        <legend>Add Reference</legend>
        <div>
          <label>Name</label>
          <input
            type="text"
            maxLength="40"
            id="reference-name-input"
            onChange={handleValueChange}
            defaultValue={props.reference.name}
          />
        </div>
        <div>
          <label>Position</label>
          <input
            type="text"
            maxLength="40"
            id="reference-name-input"
            onChange={handleValueChange}
            defaultValue={props.reference.position}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            maxLength="40"
            id="reference-email-input"
            onChange={handleValueChange}
            defaultValue={props.reference.email}
          />
        </div>
        <SaveInfoButton 
          setToClear={false}
          uploadData={props.uploadReferenceInfo}
          validateInputSubmission={props.validateInputSubmission}/>
      </fieldset>
    </form>
  )
}

ReferenceInfo.defaultProps = {
  reference: {
    name: '',
    position: '',
    email: '',
  }
}

ReferenceInfo.propTypes = {
  reference: PropTypes.object,
  uploadReferenceInfo: PropTypes.func,
  validateInput: PropTypes.func,
  validateInputSubmission: PropTypes.func,
}

const AccountInput = (props) => {

  const handleValueChange = (e) => {
    props.validateInput(e.target)
  }

  return (
    <div className="account-info-input">
      <label htmlFor={props.inputName}>{props.labelText}</label>
      <input
        type="text"
        maxLength="40"
        minLength="3"
        id={props.inputName}
        name={props.inputName}
        onChange={handleValueChange}
        defaultValue={props.currentInfo}/>
    </div>
  )
}

AccountInput.propTypes = {
  currentInfo: PropTypes.string,
  inputName: PropTypes.string,
  labelText: PropTypes.string,
  validateInput: PropTypes.func,
}

const AccountInfo = (props) => {

  return (
    <form className="account-info-overview">
      <AccountInput 
        inputName="account-input-first-name"
        labelText="First Name(s) "
        validateInput={props.validateInput}
        currentInfo={props.userInfo.firstName}
      />
      <AccountInput 
        inputName="account-input-surname"
        labelText="Surname "
        validateInput={props.validateInput}
        currentInfo={props.userInfo.surname}
      />
      <AccountInput
        inputName="account-input-email"
        labelText="Email "
        validateInput={props.validateInput}
        currentInfo={props.userInfo.email}
      />
      <AccountInput 
        inputName="account-input-number"
        labelText="Contact Number "
        validateInput={props.validateInput}
        currentInfo={props.userInfo.contactNumber}
      />
      <AccountInput 
        inputName="account-input-profession"
        labelText="Profession "
        validateInput={props.validateInput}
        currentInfo={props.userInfo.profession}
      />
      <SaveInfoButton 
        setToClear={false}
        uploadData={props.uploadAccountInfo}
        validateInputSubmission={props.validateInputSubmission}
      />
    </form>
  )
}

AccountInfo.propTypes = {
  uploadAccountInfo: PropTypes.func,
  userInfo: PropTypes.object,
  validateInput: PropTypes.func,
  validateInputSubmission: PropTypes.func,
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

    this.state = {
      isModalActive: false,
    }

    this.closeModal = this.props.closeModal.bind(this)
    this.handleAvatarUpload = this.handleAvatarUpload.bind(this)
    this.showResetModal = this.showResetModal.bind(this)
  }

  handleAvatarUpload(e) {
    this.props.uploadAvatarChange(e.target.files[0])
  }

  showResetModal() {
    this.setState({
      isModalActive: <ResetInfoModal 
        closeModal={this.closeModal}
        resetFunc={this.props.resetFunc}
      />
    })
  }

  render() {
    return (
      <main>
        {this.state.isModalActive}
        <div className="you-page-overview">
          <AccountAvatar 
            imgSource={this.props.userInfo.avatarImg}
            handleAvatarUpload={this.handleAvatarUpload}/>
          <AccountInfo 
            uploadAccountInfo={this.props.uploadAccountInfo}
            userInfo={this.props.userInfo}
            validateInput={this.props.validateInput}
            validateInputSubmission={this.props.validateInputSubmission}/>
          <ReferenceInfo 
            reference={this.props.userInfo.reference}
            uploadReferenceInfo={this.props.uploadReferenceInfo}
            validateInput={this.props.validateInput}
            validateInputSubmission={this.props.validateInputSubmission}/>
          <ResetButton 
            showResetModal={this.showResetModal}/>
        </div>
      </main>
    )
  }
}

You.propTypes = {
  closeModal: PropTypes.func,
  resetFunc: PropTypes.func,
  uploadAccountInfo: PropTypes.func,
  uploadAvatarChange: PropTypes.func,
  uploadReferenceInfo: PropTypes.func,
  userInfo: PropTypes.object,
  validateInput: PropTypes.func,
  validateInputSubmission: PropTypes.func,
}