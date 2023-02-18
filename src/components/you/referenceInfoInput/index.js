import { SaveInfoButton } from '@utilities/buttons'
import PropTypes from 'prop-types'
import React from 'react'

import style from './style.module.css'

export default function ReferenceInfo(props) {
  const handleValueChange = (e) => {
    props.validateInput(e.target)
  }

  return (
    <form className={style.referenceInputOverview}>
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
