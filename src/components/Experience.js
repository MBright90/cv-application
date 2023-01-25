import React from 'react'
import PropTypes from 'prop-types'

import { SaveInfoButton, EditButton, DeleteButton } from './Buttons'

const ExperienceItem = (props) => {
  return (
    <div className="list-item">
      <p className="list-item-headline">{props.experienceItem.workplaceName.toUpperCase()}</p>
      <p className="list-item-dates">{props.experienceItem.dateFrom} - {props.experienceItem.dateTo}</p>
      <p className="list-item-details">{props.experienceItem.experienceSummary}</p>
      <EditButton />
      <DeleteButton />
    </div>
  )
}

ExperienceItem.propTypes = {
  experienceItem: PropTypes.object
}

const ExperienceList = (props) => {
  const createExperienceList = () => {
    return props.experienceArray.map((experienceItem) => {
      return <ExperienceItem 
        key={`${experienceItem.workplaceName}${experienceItem.dateFrom}`}
        experienceItem={experienceItem}
      />
    })
  }

  return (
    <div className="experience-list-overview">
      {createExperienceList()}
    </div>
  )
}


ExperienceList.propTypes = {
  experienceArray: PropTypes.array
}

const ExperienceInput = (props) => {
  return (
    <form className='experience-input-overview'>
      <fieldset>
        <legend>Add New Certificate</legend>
        <div className="span-two">
          <label>Workplace</label>
          <input 
            type="text"
            id="experience-workplace-input"
            defaultValue={props.experienceItem.workplaceName}/>
        </div>
        <div>
          <label>Date From</label>
          <input 
            type="date"
            id="experience-date-from-input"
            defaultValue={props.experienceItem.dateFrom}
          />
        </div>
        <div>
          <label>Date To</label>
          <input 
            type="date" 
            id="experience-date-to-input"
            defaultValue={props.experienceItem.dateTo}
          />
        </div>
        <div className="span-two">
          <label>Summary</label>
          <textarea
            id="experience-summary-input"
            minLength={20}
            defaultValue={props.experienceItem.Summary}
          ></textarea>
        </div>
        <SaveInfoButton
          uploadData={props.uploadExperienceInfo}/>
      </fieldset>
    </form>
  )
}

ExperienceInput.defaultProps = {
  experienceItem: {
    workplaceName: '',
    dateFrom: new Date(1, 1, 1970),
    dateTo: new Date(1, 1, 1971),
    experienceSummary: ''
  }
}

ExperienceInput.propTypes = {
  experienceItem: PropTypes.object,
  uploadExperienceInfo: PropTypes.func,
}

const Experience = (props) => {
  return (
    <main>
      <div className="experience-page-overview">
        <ExperienceInput 
          uploadExperienceInfo={props.uploadExperienceInfo}
        />
        <ExperienceList 
          experienceArray={props.userExperienceArray}
        />
      </div>
    </main>
  )
}

Experience.propTypes = {
  uploadExperienceInfo: PropTypes.func,
  userExperienceArray: PropTypes.array,
}

export default Experience