import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SaveInfoButton, EditButton, DeleteButton } from './Buttons'
import { EditInfoModal } from './Modals'

const EducationItem = (props) => {
  const certificateParaArray = (certificateArray) => {
    return certificateArray.map((certificate) => {
      return (
        <p
          key={certificate}
          className="list-item-details"
        >{certificate}</p>
      )
    })
  }

  return (
    <div className="list-item">
      <p className="list-item-headline">{props.educationItem.institutionName.toUpperCase()}</p>
      <p className="list-item-dates">{props.educationItem.dateFrom} - {props.educationItem.dateTo}</p>
      {certificateParaArray(props.educationItem.certificates)}
      <EditButton
        editFunc={props.editFunc}
        itemID={props.educationItem.ID}
      />
      <DeleteButton
        editFunc={console.log('edit')}
        itemID={props.educationItem.ID}
      />
    </div>
  )
}

EducationItem.propTypes = {
  editFunc: PropTypes.func,
  educationItem: PropTypes.object
}

const EducationList = (props) => {
  const createEducationList = () => {
    return props.educationArray.map((educationItem) => {
      return <EducationItem
        key={`${educationItem.institutionName}${educationItem.dateFrom}`}
        editFunc={props.editFunc}
        educationItem={educationItem}/>
    })
  }

  return (
    <div className="education-list-overview">
      {createEducationList()}
    </div>
  )
}

EducationList.propTypes = {
  editFunc: PropTypes.func,
  educationArray: PropTypes.array
}

const CertificateInput = (props) => {
  return (
    <input
      className="certificate-input"
      type="text"
      id={`certificate${props.inputIndex}`}
      defaultValue={props.currentCertificate}
      data-input-index={props.inputIndex}
      onChange={props.handleCertificateChange}
    />
  )
}

CertificateInput.propTypes = {
  currentCertificate: PropTypes.string,
  handleCertificateChange: PropTypes.func,
  inputIndex: PropTypes.number,
}

class EducationInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      certificateInputAmount: this.props.educationItem.certificates.length,
      currentCertificateValues: [...this.props.educationItem.certificates]
    }

    this.handleCertificateChange = this.handleCertificateChange.bind(this)
    this.handleNewCertificate = this.handleNewCertificate.bind(this)
  }

  handleCertificateChange(e) {
    const certificateIndex = parseInt(e.target.dataset.inputIndex, 10)
    const newCertificateValues = [...this.state.currentCertificateValues]
    newCertificateValues[certificateIndex] = e.target.value

    // Keeps up to date record of all current input values across the certificates
    this.setState({
      currentCertificateValues: newCertificateValues
    })
  }

  handleNewCertificate() {
    this.setState({
      certificateInputAmount: this.state.certificateInputAmount + 1
    })
  }

  createCertificateInputs = () => {
    // Create an array of n from certificateInputAmount
    const indexArray = [...Array(this.state.certificateInputAmount).keys()]

    // Map out array using each index to create a certificate input
    return indexArray.map((index) => {
      return (<CertificateInput 
        key={`certificate-${index}`}
        inputIndex={index}
        currentCertificate={this.state.currentCertificateValues[index]}
        handleCertificateChange={this.handleCertificateChange}
      />
      )
    })
  }

  render() {
    return (
      <form className='education-input-overview'>
        <fieldset>
          <legend>{this.props.formType} New Certificate</legend>
          <div className="span-two">
            <label htmlFor="">Institution</label>
            <input 
              type="text"
              id="education-institution-input"
              defaultValue={this.props.educationItem.institutionName}/>
          </div>
          <div>
            <label htmlFor="">Date From</label>
            <input 
              type="date"
              id="education-date-from-input"
              defaultValue={this.props.educationItem.dateFrom}
            />
          </div>
          <div>
            <label htmlFor="">Date To</label>
            <input 
              type="date" 
              id="education-date-to-input"
              defaultValue={this.props.educationItem.dateTo}
            />
          </div>
          <div className="certificate-input-container span-two">
            <label htmlFor="certificates">Certificate(s)</label>
            {this.createCertificateInputs()}
            <button
              className="new-certificate-button"
              type="button"
              onClick={this.handleNewCertificate}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <SaveInfoButton
            uploadData={this.props.uploadEducationInfo}/>
        </fieldset>
      </form>
    )
  }
}

EducationInput.defaultProps = {
  educationItem: {
    institutionName: '',
    dateFrom: new Date(1, 1, 1970),
    dateTo: new Date(1, 1, 1971),
    certificates: [''],
  }
}

EducationInput.propTypes = {
  educationItem: PropTypes.object,
  formType: PropTypes.string,
  uploadEducationInfo: PropTypes.func,
}

class Education extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalActive: false
    }

    this.closeModal = this.props.closeModal.bind(this)
    this.showEducationModal = this.showEducationModal.bind(this)
  }

  showEducationModal(e) {
    const infoID = e.target.dataset.itemId
    const educationObj = this.props.requestInfoByID(infoID, 'education')

    educationObj.dateFrom = this.props.revertToDateObject(educationObj.dateFrom)
    educationObj.dateTo = this.props.revertToDateObject(educationObj.dateTo)

    this.setState({
      isModalActive: <EditInfoModal 
        closeModal={this.closeModal}
        editForm={<EducationInput
          educationItem={educationObj}
          formType='Edit'
          uploadEducationInfo={this.props.editEducationInfo}
        />}
      />
    })
  }

  render() {
    return (
      <main>
        <div className="education-page-overview">
          {this.state.isModalActive}
          <EducationInput 
            uploadEducationInfo={this.props.uploadEducationInfo}
          />
          <EducationList 
            educationArray={this.props.userEducationArray}
            editFunc={this.showEducationModal}
          />
        </div>
      </main>
    )
  }
}

Education.propTypes = {
  closeModal: PropTypes.func,
  editEducationInfo: PropTypes.func,
  requestInfoByID: PropTypes.func,
  revertToDateObject: PropTypes.func,
  uploadEducationInfo: PropTypes.func,
  userEducationArray: PropTypes.array
}

export default Education
export { EducationInput }