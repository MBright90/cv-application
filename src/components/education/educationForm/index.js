import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SaveInfoButton } from '@utilities/buttons'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import style from './style.module.css'

const CertificateInput = (props) => {
  const [isValid, setIsValid] = useState(false)

  const handleValueChange = (e) => {
    props.checkValidity(e.target) ? setIsValid(true) : setIsValid(false)
  }

  return (
    <input
      className={`${style.certificateInput} ${isValid ? null : style.invalid}`}
      type="text"
      id={`certificate${props.inputIndex}`}
      defaultValue={props.currentCertificate}
      data-input-index={props.inputIndex}
      minLength="3"
      onChange={handleValueChange}
    />
  )
}

CertificateInput.propTypes = {
  currentCertificate: PropTypes.string,
  checkValidity: PropTypes.func,
  inputIndex: PropTypes.number
}

const TextInput = (props) => {
  const [isValid, setIsValid] = useState(false)

  const handleValueChange = (e) => {
    props.checkValidity(e.target) ? setIsValid(true) : setIsValid(false)
  }

  return (
    <div className={style.spanTwo}>
      <label htmlFor="">Institution</label>
      <input
        className={isValid ? null : style.invalid}
        type="text"
        id={`education-${props.identifier}-input`}
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
        id={`education-${props.identifier}-input`}
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

export default function EducationForm(props) {
  const [certificateInputAmount, setCertificateInputAmount] = useState(
    props.educationItem.certificates.length
  )
  const currentCertificateValues = [...props.educationItem.certificates]

  const createCertificateInputs = () => {
    // Create an array of n from certificateInputAmount
    const indexArray = [...Array(certificateInputAmount).keys()]

    // Map out array using each index to create a certificate input
    return indexArray.map((index) => {
      return (
        <CertificateInput
          key={`certificate-${index}`}
          inputIndex={index}
          currentCertificate={currentCertificateValues[index]}
          checkValidity={CheckValidity}
        />
      )
    })
  }

  const handleInfoSave = (inputValues, infoID, infoType) => {
    setCertificateInputAmount(1)
    props.uploadEducationInfo(inputValues, infoID, infoType)
  }

  const handleNewCertificate = () => setCertificateInputAmount(certificateInputAmount + 1)

  const CheckValidity = (inputElement) => props.validateInput(inputElement)

  return (
    <form className={style.educationInputOverview}>
      <fieldset>
        <legend>{props.formType} New Certificate</legend>
        <TextInput
          checkValidity={props.validateInput}
          defaultValue={props.educationItem.institutionName}
          identifier="institution"
          inputLabel="Institution"
        />
        <DateInput
          checkValidity={props.validateInput}
          defaultValue={props.educationItem.dateFrom}
          identifier="date-from"
          inputLabel="Date From"
        />
        <DateInput
          checkValidity={props.validateInput}
          defaultValue={props.educationItem.dateTo}
          identifier="date-to"
          inputLabel="Date To"
        />
        <div className={`${style.certificateInputContainer} ${style.spanTwo}`}>
          <label htmlFor="certificates">Certificate(s)</label>
          {createCertificateInputs()}
          <button
            className={style.newCertificateButton}
            type="button"
            onClick={handleNewCertificate}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <SaveInfoButton
          closeModal={props.closeModal}
          itemID={props.itemID}
          infoType="education"
          uploadData={handleInfoSave}
          validateInputSubmission={props.validateInputSubmission}
        />
      </fieldset>
    </form>
  )
}

EducationForm.defaultProps = {
  closeModal: () => {},
  educationItem: {
    institutionName: '',
    dateFrom: new Date(1970).toISOString().substring(0, 10),
    dateTo: new Date().toISOString().substring(0, 10),
    certificates: ['']
  },
  formType: 'Add'
}

EducationForm.propTypes = {
  closeModal: PropTypes.func,
  educationItem: PropTypes.object,
  itemID: PropTypes.string,
  formType: PropTypes.string,
  uploadEducationInfo: PropTypes.func,
  validateInput: PropTypes.func,
  validateInputSubmission: PropTypes.func
}
