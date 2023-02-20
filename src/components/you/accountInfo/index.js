import { SaveInfoButton } from '@utilities/buttons'
import PropTypes from 'prop-types'
import React from 'react'

import style from './style.module.css'

const AccountInput = (props) => {

  const [isValid, setValidity] = useState(true)

  const handleValueChange = (e) => {
    props.checkValidity(e.target) ? setValidity(true) : setValidity(false)
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
  checkValidity: propTypes.func.isRequired,
  defaultValue: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
}

export default function AccountInfo(props) {
  return (
    <form className={style.accountInfoOverview}>
      <AccountInput
        inputName="account-input-first-name"
        inputLabel="First Name(s) "
        checkValidity={props.validateInput}
        defaultValue={props.userInfo.firstName}
      />
      <AccountInput
        inputName="account-input-surname"
        inputLabel="Surname "
        checkValidity={props.validateInput}
        defaultValue={props.userInfo.surname}
      />
      <AccountInput
        inputName="account-input-email"
        inputLabel="Email "
        checkValidity={props.validateInput}
        defaultValue={props.userInfo.email}
      />
      <AccountInput
        inputName="account-input-number"
        inputLabel="Contact Number "
        checkValidity={props.validateInput}
        defaultValue={props.userInfo.contactNumber}
      />
      <AccountInput
        inputName="account-input-profession"
        inputLabel="Profession "
        checkValidity={props.validateInput}
        defaultValue={props.userInfo.profession}
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
  validateInputSubmission: PropTypes.func
}
