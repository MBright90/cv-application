import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.css'
import AccountAvatarUpload from '../accountAvatarUpload/AccountAvatarUpload'
import AccountInfo from '../accountInfo/AccountInfo'
import ReferenceInfo from '../referenceInfoInput/ReferenceInfoInput'

import { ResetButton } from '../utilities/Buttons'
import { ResetInfoModal } from '../utilities/Modals'

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
          <AccountAvatarUpload
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