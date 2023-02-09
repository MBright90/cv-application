import React from 'react'
import PropTypes from 'prop-types'

import { EditButton, DeleteButton } from '../utilities/Buttons'

const ExperienceItem = (props) => {

  let editableButtons = []
  if (props.editable) {
    editableButtons = [
      <EditButton 
        key={`${props.experienceItem.ID}edit`}
        editFunc={props.editFunc}
        itemID={props.experienceItem.ID}
      />,
      <DeleteButton
        key={`${props.experienceItem.ID}del`}
        itemID={props.experienceItem.ID}
        showDeleteFunc={props.showDeleteFunc}
      />
    ]
  }

  return (
    <div className="list-item">
      <p className="list-item-headline">{props.experienceItem.workplaceName.toUpperCase()}</p>
      <p className="list-item-dates">{props.experienceItem.dateFrom} - {props.experienceItem.dateTo}</p>
      <p className="list-item-details">{props.experienceItem.experienceSummary}</p>
      {editableButtons}
    </div>
  )
}
  
ExperienceItem.propTypes = {
  editable: PropTypes.bool,
  editFunc: PropTypes.func,
  experienceItem: PropTypes.object,
  showDeleteFunc: PropTypes.func,
}
  
const ExperienceList = (props) => {
  const createExperienceList = () => {
    return props.experienceArray.map((experienceItem) => {
      return <ExperienceItem 
        key={`${experienceItem.workplaceName}${experienceItem.dateFrom}`}
        editable={props.editable}
        editFunc={props.editFunc}
        experienceItem={experienceItem}
        showDeleteFunc={props.showDeleteFunc}
      />
    })
  }
  
  return (
    <div className="experience-list-overview">
      {createExperienceList()}
    </div>
  )
}

ExperienceList.defaultProps = {
  editable: false,
  editFunc: () => {},
  showDeleteFunc: () => {},
}
  
ExperienceList.propTypes = {
  editable: PropTypes.bool,
  editFunc: PropTypes.func,
  experienceArray: PropTypes.array,
  showDeleteFunc: PropTypes.func,
}

export default ExperienceList
