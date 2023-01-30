import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SaveInfoButton, EditButton, DeleteButton } from './Buttons'
import { EditInfoModal } from './Modals' 

const ExperienceItem = (props) => {
  return (
    <div className="list-item">
      <p className="list-item-headline">{props.experienceItem.workplaceName.toUpperCase()}</p>
      <p className="list-item-dates">{props.experienceItem.dateFrom} - {props.experienceItem.dateTo}</p>
      <p className="list-item-details">{props.experienceItem.experienceSummary}</p>
      <EditButton 
        editFunc={props.editFunc}
        itemID={props.experienceItem.ID}
      />
      <DeleteButton
        deleteFunc={console.log('delete')}
        itemID={props.experienceItem.ID}
      />
    </div>
  )
}

ExperienceItem.propTypes = {
  editFunc: PropTypes.func,
  experienceItem: PropTypes.object
}

const ExperienceList = (props) => {
  const createExperienceList = () => {
    return props.experienceArray.map((experienceItem) => {
      return <ExperienceItem 
        key={`${experienceItem.workplaceName}${experienceItem.dateFrom}`}
        experienceItem={experienceItem}
        editFunc={props.editFunc}
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
  editFunc: PropTypes.func,
  experienceArray: PropTypes.array
}

const ExperienceInput = (props) => {
  return (
    <form className='experience-input-overview'>
      <fieldset>
        <legend>{props.formType} Workplace Experience</legend>
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
            defaultValue={props.experienceItem.experienceSummary}
          ></textarea>
        </div>
        <SaveInfoButton
          itemID={props.itemID}
          infoType={'experience'}
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
  },
  formType: 'Add',
}

ExperienceInput.propTypes = {
  experienceItem: PropTypes.object,
  itemID: PropTypes.string,
  formType: PropTypes.string,
  uploadExperienceInfo: PropTypes.func,
}

class Experience extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalActive: false
    }

    this.closeModal = this.props.closeModal.bind(this)
    this.showExperienceModal = this.showExperienceModal.bind(this)
  }

  showExperienceModal(e) {
    const infoID = e.target.dataset.itemId
    const experienceObj = Object.assign({}, this.props.requestInfoByID(infoID, 'experience'))

    experienceObj.dateFrom = this.props.revertToDateObject(experienceObj.dateFrom)
    experienceObj.dateTo = this.props.revertToDateObject(experienceObj.dateTo)

    this.setState({
      isModalActive: <EditInfoModal 
        closeModal={this.closeModal}
        editForm={<ExperienceInput
          experienceItem={experienceObj}
          formType='Edit'
          itemID={infoID}
          uploadExperienceInfo={this.props.editExperienceInfo}
        />}
      />
    })
  }

  render() {
    return (
      <main>
        {this.state.isModalActive}
        <div className="experience-page-overview">
          {this.state.isModalActive}
          <ExperienceInput 
            uploadExperienceInfo={this.props.uploadExperienceInfo}
          />
          <ExperienceList 
            experienceArray={this.props.userExperienceArray}
            editFunc={this.showExperienceModal}
          />
        </div>
      </main>
    )
  }
}

Experience.propTypes = {
  closeModal: PropTypes.func,
  editExperienceInfo: PropTypes.func,
  requestInfoByID: PropTypes.func,
  revertToDateObject: PropTypes.func,
  uploadExperienceInfo: PropTypes.func,
  userExperienceArray: PropTypes.array,
}

export default Experience
export { ExperienceInput }