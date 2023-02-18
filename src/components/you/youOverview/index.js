import { AccountAvatarUpload, AccountInfo, ReferenceInfo } from '@components/you'
import { ResetButton } from '@utilities/buttons'
import { ResetInfoModal } from '@utilities/modals'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import './style.css'

export default function YouOverview(props) {
  const [activeModal, setActiveModal] = useState(null)

  const closeModal = () => setActiveModal(null)

  const showResetModal = () => {
    setActiveModal(<ResetInfoModal closeModal={closeModal} resetFunc={props.resetFunc} />)
  }

  const handleAvatarUpload = (e) => props.uploadAvatarChange(e.target.files[0])

  return (
    <main>
      {activeModal}
      <div className="you-page-overview">
        <AccountAvatarUpload
          imgSource={props.userInfo.avatarImg}
          handleAvatarUpload={handleAvatarUpload}
        />
        <AccountInfo
          uploadAccountInfo={props.uploadAccountInfo}
          userInfo={props.userInfo}
          validateInput={props.validateInput}
          validateInputSubmission={props.validateInputSubmission}
        />
        <ReferenceInfo
          reference={props.userInfo.reference}
          uploadReferenceInfo={props.uploadReferenceInfo}
          validateInput={props.validateInput}
          validateInputSubmission={props.validateInputSubmission}
        />
        <ResetButton showResetModal={showResetModal} />
      </div>
    </main>
  )
}

YouOverview.propTypes = {
  resetFunc: PropTypes.func,
  uploadAccountInfo: PropTypes.func,
  uploadAvatarChange: PropTypes.func,
  uploadReferenceInfo: PropTypes.func,
  userInfo: PropTypes.object,
  validateInput: PropTypes.func,
  validateInputSubmission: PropTypes.func
}
