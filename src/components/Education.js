import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SaveButton from './SaveButton'

const EducationDetail = (props) => {
  const certificateParaArray = (certificateArray) => {
    return certificateArray.map((certificate) => {
      return (
        <p
          key={certificate}
          className="education-item-certificate"
        >{certificate}</p>
      )
    })
  }

  return (
    <div className="education-list-item">
      <p className="education-item-headline">{props.educationItem.institutionName.toUpperCase()}</p>
      <p className="education-item-dates">{props.educationItem.dateFrom} - {props.educationItem.dateTo}</p>
      {certificateParaArray(props.educationItem.certificates)}
    </div>
  )
}

EducationDetail.propTypes = {
  educationItem: PropTypes.object
}

const EducationList = (props) => {
  const createEducationList = () => {
    return props.educationArray.map((educationItem) => {
      return <EducationDetail
        key={`${educationItem.institutionName}${educationItem.dateFrom}`}
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
          <legend>Add New Certificate</legend>
          <div>
            <label htmlFor="">Institution</label>
            <input 
              type="text"
              id=""
              defaultValue={this.props.educationItem.institutionName}/>
          </div>
          <div>
            <label htmlFor="">Date From</label>
            <input 
              type="date"
              id=""
              defaultValue={this.props.educationItem.dateFrom}
            />
          </div>
          <div>
            <label htmlFor="">Date To</label>
            <input 
              type="date" 
              id=""
              defaultValue={this.props.educationItem.dateTo}
            />
          </div>
          <div className="certificate-input-container">
            <label htmlFor="certificates">Certificate(s)</label>
            {this.createCertificateInputs()}
            <button
              className="new-certificate-button"
              type="button"
              onClick={this.handleNewCertificate}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <SaveButton 
            uploadData={this.props.uploadEducationInfo}/>
        </fieldset>
      </form>
    )
  }
}

EducationInput.defaultProps = {
  educationItem: {
    institutionName: '',
    certificates: [''],
    dateFrom: new Date(1, 1, 1970),
    dateTo: new Date(1, 1, 1971),
  }
}

EducationInput.propTypes = {
  educationItem: PropTypes.object,
  uploadEducationInfo: PropTypes.func,
}

export default class Education extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main>
        <div className="education-page-overview">
          <EducationInput 
            uploadEducationInfo={this.props.uploadEducationInfo}
          />
          <EducationList 
            educationArray={this.props.userEducationArray}
          />
        </div>
      </main>
    )
  }
}

Education.propTypes = {
  uploadEducationInfo: PropTypes.func,
  userEducationArray: PropTypes.array
}
