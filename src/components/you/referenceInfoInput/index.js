import { SaveInfoButton } from '@utilities/buttons'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import style from './style.module.css'

const TextInput = (props) => {
  const [isValid, setValidity] = useState(true)  

  const handleValueChange = (e) => {
    props.checkValidity(e.target) ? setValidity(true) : setValidity(false)
  }

  return (
    <div>
      <label>{props.inputLabel}</label>
      <input
        className={isValid ? null : style.invalid }
        type="text"
        maxLength="40"
        id={`reference-${props.identifier}-input`}
        onChange={handleValueChange}
        defaultValue={props.defaultValue}
      />
    </div>
  )

}

TextInput.propTypes = {
  checkValidity: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  identifier: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired
}

export default function ReferenceInfo(props) {

  return (
    <form className={style.referenceInputOverview}>
      <fieldset>
        <legend>Add Reference</legend>
        <TextInput
          checkValidity={props.validateInput}
          defaultValue={props.reference.name}
          identifier='name'
          inputLabel='Name'
        />
        <TextInput
          checkValidity={props.validateInput}
          defaultValue={props.reference.position}
          identifier='position'
          inputLabel='Position'
        />
        <TextInput
          checkValidity={props.validateInput}
          defaultValue={props.reference.email}
          identifier='email'
          inputLabel='Email'
        />
        <SaveInfoButton
          setToClear={false}
          uploadData={props.uploadReferenceInfo}
          validateInputSubmission={props.validateInputSubmission}
        />
      </fieldset>
    </form>
  )
}

ReferenceInfo.defaultProps = {
  reference: {
    name: '',
    position: '',
    email: ''
  }
}

ReferenceInfo.propTypes = {
  reference: PropTypes.object,
  uploadReferenceInfo: PropTypes.func,
  validateInput: PropTypes.func,
  validateInputSubmission: PropTypes.func
}
