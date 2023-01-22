import React, { Component } from 'react'
import PropTypes from 'prop-types'

const EducationDetail = (props) => {
  const education = props.educationItem

  return (
    <div className="education-list-item">
      <p className="education-detail--headline">{education.institutionName} {education.dates}</p>
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
    <div className="education-detail-list">
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
          <label htmlFor=""></label>
          <input 
            type="text"
            id=""
            value={props.educationItem.institutionName}/>
        </div>
        <div>
          <label htmlFor=""></label>
          <input 
            type="date"
            id=""
            value={props.educationItem.dateFrom}
          />
          <label htmlFor=""></label>
          <input 
            type="date" 
            id=""
            value={props.educationItem.dateTo}
          />
        </div>
        <div>
          <label htmlFor=""></label>
          <input 
            type="text"
            id=""
            value={props.educationItem.certificate}
          />
        </div>
      </fieldset>
      <button type="submit"></button>
    </form>
  )
}

EducationInput.defaultProps = {
  educationItem: {
    institutionName: '',
    dateFrom: new Date(1, 1, 1970),
    dateTo: new Date(1, 1, 1971),
    certificate: '',
  }
}

EducationInput.propTypes = {
  educationItem: PropTypes.object,
}

export default class Education extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main>
        <div className="education-page-overview">
          <EducationInput />
          <EducationList 
            educationArray={this.props.userEducationArray}
          />
        </div>
      </main>
    )
  }
}

Education.propTypes = {
  userEducationArray: PropTypes.array
}
