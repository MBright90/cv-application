import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SaveInfoButton, EditButton, DeleteButton } from './Buttons'
import { DeleteInfoModal, EditInfoModal } from './Modals'

const EducationItem = (props) => {
  const certificateParaArray = (certificateArray) => {
    return certificateArray.map((certificate) => {
      return (
        <p key={certificate}
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
        itemID={props.educationItem.ID}
        showDeleteFunc={props.showDeleteFunc}
      />
    </div>
  )
}

EducationItem.propTypes = {
  editFunc: PropTypes.func,
  educationItem: PropTypes.object,
  showDeleteFunc: PropTypes.func,
}

const EducationList = (props) => {
  const createEducationList = () => {
    return props.educationArray.map((educationItem) => {
      return <EducationItem
        key={`${educationItem.institutionName}${educationItem.dateFrom}`}
        editFunc={props.editFunc}
        educationItem={educationItem}
        showDeleteFunc={props.showDeleteFunc}/>
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
  educationArray: PropTypes.array,
  showDeleteFunc: PropTypes.func,
}

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
  inputIndex: PropTypes.number,
}

class EducationInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      certificateInputAmount: this.props.educationItem.certificates.length,
      currentCertificateValues: [...this.props.educationItem.certificates]
    }

    this.handleInfoSave = this.handleInfoSave.bind(this)
    this.handleNewCertificate = this.handleNewCertificate.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
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
        handleValueChange={this.handleValueChange}
      />
      )
    })
  }

  handleInfoSave(inputValues, infoID, infoType) {
    this.setState({
      certificateInputAmount: 1
    })
    this.props.uploadEducationInfo(inputValues, infoID, infoType)
  }

  handleNewCertificate() {
    this.setState({
      certificateInputAmount: this.state.certificateInputAmount + 1
    })
  }

  handleValueChange(e) {
    this.props.validateInput(e.target)
  }

  render() {
    let closeModal
    if (this.props.closeModal) closeModal = this.props.closeModal

    return (
      <form className='education-input-overview'>
        <fieldset>
          <legend>{this.props.formType} New Certificate</legend>
          <div className="span-two">
            <label htmlFor="">Institution</label>
            <input 
              type="text"
              id="education-institution-input"
              minLength="3"
              onChange={this.handleValueChange}
              data-is-required={true}
              defaultValue={this.props.educationItem.institutionName}/>
          </div>
          <div>
            <label htmlFor="">Date From</label>
            <input 
              type="date"
              id="education-date-from-input"
              onChange={this.handleValueChange}
              data-is-required={true}
              data-date="from"
              defaultValue={this.props.educationItem.dateFrom}
            />
          </div>
          <div>
            <label htmlFor="">Date To</label>
            <input 
              type="date" 
              id="education-date-to-input"
              onChange={this.handleValueChange}
              data-is-required={true}
              data-date="to"
              defaultValue={this.props.educationItem.dateTo}
            />
          </div>
          <div className="certificate-input-container span-two">
            <label htmlFor="certificates">Certificate(s)</label>
            {this.createCertificateInputs()}
            <button
              className="new-certificate-button hover-button"
              type="button"
              onClick={this.handleNewCertificate}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <SaveInfoButton
            closeModal={closeModal}
            itemID={this.props.itemID}
            infoType='education'
            uploadData={this.handleInfoSave}/>
        </fieldset>
      </form>
    )
  }
}

EducationInput.defaultProps = {
  educationItem: {
    institutionName: '',
    dateFrom: new Date(1970).toISOString().substring(0, 10),
    dateTo: new Date().toISOString().substring(0,10),
    certificates: [''],
  },
  formType: 'Add',
}

EducationInput.propTypes = {
  closeModal: PropTypes.func,
  educationItem: PropTypes.object,
  itemID: PropTypes.string,
  formType: PropTypes.string,
  uploadEducationInfo: PropTypes.func,
  validateInput: PropTypes.func,
}

class Education extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalActive: false
    }

    this.closeModal = this.props.closeModal.bind(this)
    this.showDeleteModal = this.showDeleteModal.bind(this)
    this.showEducationModal = this.showEducationModal.bind(this)
  }

  showDeleteModal(e) {

    const infoID = e.target.dataset.itemId

    this.setState({
      isModalActive: <DeleteInfoModal
        closeModal={this.closeModal}
        deleteFunc={this.props.deleteFunc}
        itemID={infoID}
        type='education'
      />
    })
  }

  showEducationModal(e) {
    const infoID = e.target.dataset.itemId
    const educationObj = Object.assign({}, this.props.requestInfoByID(infoID, 'education'))

    educationObj.dateFrom = this.props.revertToDateObject(educationObj.dateFrom)
    educationObj.dateTo = this.props.revertToDateObject(educationObj.dateTo)

    this.setState({
      isModalActive: <EditInfoModal 
        closeModal={this.closeModal}
        editForm={<EducationInput
          closeModal={this.closeModal}
          educationItem={educationObj}
          formType='Edit'
          itemID={infoID}
          uploadEducationInfo={this.props.editEducationInfo}
          validateInput={this.props.validateInput}
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
            validateInput={this.props.validateInput}
          />
          <EducationList 
            educationArray={this.props.userEducationArray}
            editFunc={this.showEducationModal}
            showDeleteFunc={this.showDeleteModal}
          />
        </div>
      </main>
    )
  }
}

Education.propTypes = {
  closeModal: PropTypes.func,
  deleteFunc: PropTypes.func,
  editEducationInfo: PropTypes.func,
  requestInfoByID: PropTypes.func,
  revertToDateObject: PropTypes.func,
  uploadEducationInfo: PropTypes.func,
  userEducationArray: PropTypes.array,
  validateInput: PropTypes.func,
  validateInputSubmission: PropTypes.func,
}

export default Education
export { EducationInput }