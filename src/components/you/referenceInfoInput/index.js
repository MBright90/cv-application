import { appContext } from '@app/appContext'
import { SaveInfoButton } from '@utilities/buttons'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'

import style from './style.module.css'

const TextInput = (props) => {
  const { validateInput } = useContext(appContext)
  const [isValid, setValidity] = useState(true)

  const handleValueChange = (e) => {
    validateInput(e.target) ? setValidity(true) : setValidity(false)
  }

  return (
    <div>
      <label>{props.inputLabel}</label>
      <input
        className={isValid ? null : style.invalid}
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
  defaultValue: PropTypes.string,
  identifier: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired
}

export default function ReferenceInfo() {
  const { activeUser, uploadReferenceInfo, validateInputSubmission } = useContext(appContext)

  const reference = activeUser.reference || {
    name: '',
    position: '',
    email: ''
  }

  return (
    <form className={style.referenceInputOverview}>
      <fieldset>
        <legend>Add Reference</legend>
        <TextInput defaultValue={reference.name} identifier="name" inputLabel="Name" />
        <TextInput defaultValue={reference.position} identifier="position" inputLabel="Position" />
        <TextInput defaultValue={reference.email} identifier="email" inputLabel="Email" />
        <SaveInfoButton
          setToClear={false}
          uploadData={uploadReferenceInfo}
          validateInputSubmission={validateInputSubmission}
        />
      </fieldset>
    </form>
  )
}
