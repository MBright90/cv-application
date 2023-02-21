import { appContext } from '@app/appContext'
import { AccountAvatarUpload, AccountInfo, ReferenceInfo } from '@components/you'
import { ResetButton } from '@utilities/buttons'
import { ResetInfoModal } from '@utilities/modals'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'

import style from './style.module.css'

export default function YouOverview(props) {
  const {
    activeUser,
    resetAllData,
    uploadAccountInfo,
    uploadAvatarChange,
    uploadReferenceInfo,
    validateCurrentInputValue,
    validateInputSubmission
  } = useContext(appContext)
  const [activeModal, setActiveModal] = useState(null)

  const closeModal = () => setActiveModal(null)

  const showResetModal = () => {
    setActiveModal(<ResetInfoModal resetFunc={resetAllData} />)
  }

  return (
    <main>
      {activeModal}
      <div className={style.youPageOverview}>
        <AccountAvatarUpload />
        <AccountInfo />
        <ReferenceInfo
          reference={activeUser.reference}
          uploadReferenceInfo={props.uploadReferenceInfo}
          validateInput={validateCurrentInputValue}
          validateInputSubmission={validateInputSubmission}
        />
        <ResetButton closeModal={closeModal} showResetModal={showResetModal} />
      </div>
    </main>
  )
}
