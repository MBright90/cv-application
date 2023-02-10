import React from 'react'
import PropTypes from 'prop-types'

import SaveInfoButton from '../../utilities/buttons/saveInfoButton'

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

export default AccountInfo