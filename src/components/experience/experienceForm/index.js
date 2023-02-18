import { SaveInfoButton } from '@utilities/buttons'
import PropTypes from 'prop-types'
import React from 'react'

import './style.css'

export default function ExperienceForm(props) {
  const handleValueChange = (e) => props.validateInput(e.target)

  return (
    <form className="experience-input-overview">
      <fieldset>
        <legend>{props.formType} Workplace Experience</legend>
        <div className="span-two">
          <label>Workplace</label>
          <input
            type="text"
            id="experience-workplace-input"
            minLength="3"
            onChange={handleValueChange}
            data-is-required={true}
            defaultValue={props.experienceItem.workplaceName}
          />
        </div>
        <div>
          <label>Date From</label>
          <input
            type="date"
            id="experience-date-from-input"
            onChange={handleValueChange}
            data-is-required={true}
            data-date="from"
            defaultValue={props.experienceItem.dateFrom}
          />
        </div>
        <div>
          <label>Date To</label>
          <input
            type="date"
            id="experience-date-to-input"
            onChange={handleValueChange}
            data-is-required={true}
            data-date="to"
            defaultValue={props.experienceItem.dateTo}
          />
        </div>
        <div className="span-two">
          <label>Summary</label>
          <textarea
            type="text"
            id="experience-summary-input"
            minLength="20"
            onChange={handleValueChange}
            data-is-required={true}
            defaultValue={props.experienceItem.experienceSummary}
          ></textarea>
        </div>
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
