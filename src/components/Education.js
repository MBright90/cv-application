import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SaveButton from './SaveButton'

const EducationDetail = (props) => {
  const education = props.educationItem

  return (
    <div className="education-list-item">
      <p className="education-detail-headline">{education.institutionName} {education.dates}</p>
      <p>{education.certificateAwarded}</p>
    </div>
  )
}

EducationDetail.propTypes = {
  educationItem: PropTypes.object
}

const EducationList = (props) => {
  const createEducationList = () => {
    props.educationArray.map((educationItem) => {
      return <EducationDetail
        key={educationItem.institutionName + educationItem.dates}
        educationDetail={educationItem}/>
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

const EducationInput = (props) => {
  // education: institutionName, date from, date to, certificate awarded

  return (
    <form className='education-input-overview'>
      <fieldset>
        <legend>Add New Certificate</legend>
        <div>
          <label htmlFor="">Institution</label>
          <input 
            type="text"
            id=""
            defaultValue={props.educationItem.institutionName}/>
        </div>
        <div>
          <label htmlFor="">Certificate</label>
          <input 
            type="text"
            id=""
            defaultValue={props.educationItem.certificate}
          />
        </div>
        <div>
          <label htmlFor="">Date From</label>
          <input 
            type="date"
            id=""
            defaultValue={props.educationItem.dateFrom}
          />
        </div>
        <div>
          <label htmlFor="">Date To</label>
          <input 
            type="date" 
            id=""
            defaultValue={props.educationItem.dateTo}
          />
        </div>
        <SaveButton 
          uploadData={props.uploadEducationInfo}/>
      </fieldset>
    </form>
  )
}

EducationInput.defaultProps = {
  educationItem: {
    institutionName: '',
    certificate: '',
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
