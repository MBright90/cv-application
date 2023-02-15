import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './style.css'
import SaveInfoButton from '@buttons/saveInfoButton/SaveInfoButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const CertificateInput = (props) => {
  return (
    <input
      className="certificate-input"
      type="text"
      id={`certificate${props.inputIndex}`}
      defaultValue={props.currentCertificate}
      data-input-index={props.inputIndex}
      minLength="3"
      onChange={props.handleValueChange}
    />
  )
}

CertificateInput.propTypes = {
  currentCertificate: PropTypes.string,
  handleValueChange: PropTypes.func,
  inputIndex: PropTypes.number
}

export default function EducationForm(props) {
  const [certificateInputAmount, setCertificateInputAmount] = useState(props.educationItem.certificates.length)
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
          handleValueChange={handleValueChange}
        />
      )
    })
  }

  const handleInfoSave = (inputValues, infoID, infoType) => {
    setCertificateInputAmount(1)
    props.uploadEducationInfo(inputValues, infoID, infoType)
  }

  const handleNewCertificate = () => {
    setCertificateInputAmount(certificateInputAmount + 1)
  }

  const handleValueChange = (e) => {
    props.validateInput(e.target)
  }

  return (
    <form className="education-input-overview">
      <fieldset>
        <legend>{props.formType} New Certificate</legend>
        <div className="span-two">
          <label htmlFor="">Institution</label>
          <input
            type="text"
            id="education-institution-input"
            minLength="3"
            onChange={handleValueChange}
            data-is-required={true}
            defaultValue={props.educationItem.institutionName}
          />
        </div>
        <div>
          <label htmlFor="">Date From</label>
          <input
            type="date"
            id="education-date-from-input"
            onChange={handleValueChange}
            data-is-required={true}
            data-date="from"
            defaultValue={props.educationItem.dateFrom}
          />
        </div>
        <div>
          <label htmlFor="">Date To</label>
          <input
            type="date"
            id="education-date-to-input"
            onChange={handleValueChange}
            data-is-required={true}
            data-date="to"
            defaultValue={props.educationItem.dateTo}
          />
        </div>
        <div className="certificate-input-container span-two">
          <label htmlFor="certificates">Certificate(s)</label>
          {createCertificateInputs()}
          <button
            className="new-certificate-button hover-button"
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