import { SaveInfoButton } from '@utilities/buttons'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import style from './style.module.css'

const TextInput = (props) => {
  const [isValid, setIsValid] = useState(false)

  const handleValueChange = (e) => {
    props.checkValidity(e.target) ? setIsValid(true) : setIsValid(false)
  }

  return (
    <div className={style.spanTwo}>
      <label htmlFor="">{props.inputLabel}</label>
      <input
        className={isValid ? null : style.invalid}
        type="text"
        id={`experience-${props.identifier}-input`}
        minLength="3"
        onChange={handleValueChange}
        data-is-required={true}
        defaultValue={props.defaultValue}
      />
    </div>
  )
}

TextInput.propTypes = {
  checkValidity: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired
}

const DateInput = (props) => {
  const [isValid, setIsValid] = useState(false)

  const handleValueChange = (e) => {
    props.checkValidity(e.target) ? setIsValid(true) : setIsValid(false)
  }

  return (
    <div>
      <label htmlFor="">{props.inputLabel}</label>
      <input
        className={isValid ? null : style.invalid}
        type="date"
        id={`experience-${props.identifier}-input`}
        onChange={handleValueChange}
        data-is-required={true}
        data-date={props.identifier.split('-')[1]}
        defaultValue={props.defaultValue}
      />
    </div>
  )
}

DateInput.propTypes = {
  checkValidity: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  inputLabel: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired
}

const TextareaInput = (props) => {
  const [isValid, setIsValid] = useState(false)

  const handleValueChange = (e) => {
    props.checkValidity(e.target) ? setIsValid(true) : setIsValid(false)
  }

  return (
    <div className={style.spanTwo}>
      <label htmlFor="">{props.inputLabel}</label>
      <textarea
        className={isValid ? null : style.invalid}
        type="text"
        id={`experience-${props.identifier}-input`}
        minLength="20"
        onChange={handleValueChange}
        data-is-required={true}
        defaultValue={props.defaultValue}
      ></textarea>
    </div>
  )
}

TextInput.propTypes = {
  checkValidity: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired
}

export default function ExperienceForm(props) {
  return (
    <form className={style.experienceInputOverview}>
      <fieldset>
        <legend>{props.formType} Workplace Experience</legend>
        <TextInput
          checkValidity={props.validateInput}
          defaultValue={props.experienceItem.workplaceName}
          identifier="workplace"
          inputLabel="Workplace"
        />
        <DateInput
          checkValidity={props.validateInput}
          defaultValue={props.experienceItem.dateFrom}
          identifier="date-from"
          inputLabel="Date From"
        />
        <DateInput
          checkValidity={props.validateInput}
          defaultValue={props.experienceItem.dateTo}
          identifier="date-to"
          inputLabel="Date To"
        />
        <TextareaInput
          checkValidity={props.validateInput}
          defaultValue={props.experienceItem.experienceSummary}
          identifier="summary"
          inputLabel="Summary"
        />
        <SaveInfoButton
          closeModal={props.closeModal}
          itemID={props.itemID}
          infoType="experience"
          uploadData={props.uploadExperienceInfo}
          validateInputSubmission={props.validateInputSubmission}
        />
      </fieldset>
    </form>
  )
}

ExperienceForm.defaultProps = {
  experienceItem: {
    workplaceName: '',
    dateFrom: new Date(1970).toISOString().substring(0, 10),
    dateTo: new Date().toISOString().substring(0, 10),
    experienceSummary: ''
  },
  closeModal: () => {},
  formType: 'Add'
}

ExperienceForm.propTypes = {
  closeModal: PropTypes.func,
  experienceItem: PropTypes.object,
  itemID: PropTypes.string,
  formType: PropTypes.string,
  uploadExperienceInfo: PropTypes.func,
  validateInput: PropTypes.func,
  validateInputSubmission: PropTypes.func
}
