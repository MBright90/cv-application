import { appContext } from '@app/appContext'
import { SaveInfoButton } from '@utilities/buttons'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'

import style from './style.module.css'

const AccountInput = (props) => {
  const { validateInput } = useContext(appContext)
  const [isValid, setValidity] = useState(true)

  const handleValueChange = (e) => {
    validateInput(e.target) ? setValidity(true) : setValidity(false)
  }

  return (
    <div className={style.accountInfoInput}>
      <label htmlFor={props.inputName}>{props.inputLabel}</label>
      <input
        className={isValid ? null : style.invalid}
        type="text"
        maxLength="40"
        minLength="3"
        id={props.inputName}
        name={props.inputName}
        onChange={handleValueChange}
        defaultValue={props.defaultValue}
      />
    </div>
  )
}

AccountInput.propTypes = {
  defaultValue: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired
}

export default function AccountInfo() {
  const { activeUser, uploadAccountInfo, validateInputSubmission } = useContext(appContext)

  return (
    <form className={style.accountInfoOverview}>
      <AccountInput
        inputName="account-input-first-name"
        inputLabel="First Name(s) "
        defaultValue={activeUser.firstName}
      />
      <AccountInput
        inputName="account-input-surname"
        inputLabel="Surname "
        defaultValue={activeUser.surname}
      />
      <AccountInput
        inputName="account-input-email"
        inputLabel="Email "
        defaultValue={activeUser.email}
      />
      <AccountInput
        inputName="account-input-number"
        inputLabel="Contact Number "
        defaultValue={activeUser.contactNumber}
      />
      <AccountInput
        inputName="account-input-profession"
        inputLabel="Profession "
        defaultValue={activeUser.profession}
      />
      <SaveInfoButton
        setToClear={false}
        uploadData={uploadAccountInfo}
        validateInputSubmission={validateInputSubmission}
      />
    </form>
  )
}
