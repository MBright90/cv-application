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
        defaultValue={props.currentInfo}
      />
    </div>
  )
}

AccountInput.propTypes = {
  checkValidity: propTypes.func.isRequired,
  currentInfo: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
}

export default function AccountInfo(props) {
  return (
    <form className={style.accountInfoOverview}>
      <AccountInput
        inputName="account-input-first-name"
        inputLabel="First Name(s) "
        validateInput={props.validateInput}
        currentInfo={props.userInfo.firstName}
      />
      <AccountInput
        inputName="account-input-surname"
        inputLabel="Surname "
        validateInput={props.validateInput}
        currentInfo={props.userInfo.surname}
      />
      <AccountInput
        inputName="account-input-email"
        inputLabel="Email "
        validateInput={props.validateInput}
        currentInfo={props.userInfo.email}
      />
      <AccountInput
        inputName="account-input-number"
        inputLabel="Contact Number "
        validateInput={props.validateInput}
        currentInfo={props.userInfo.contactNumber}
      />
      <AccountInput
        inputName="account-input-profession"
        inputLabel="Profession "
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
  validateInputSubmission: PropTypes.func
}
