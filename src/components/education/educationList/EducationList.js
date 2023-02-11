import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import { EditButton, DeleteButton } from '../utilities/Buttons'

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

  let editableButtons = []
  if (props.editable) {
    editableButtons = [
      <EditButton
        key={`${props.educationItem.ID}edit`}
        editFunc={props.editFunc}
        itemID={props.educationItem.ID}
      />,
      <DeleteButton
        key={`${props.educationItem.ID}del`}
        itemID={props.educationItem.ID}
        showDeleteFunc={props.showDeleteFunc}
      />
    ]
  }
  
  return (
    <div className="list-item">
      <p className="list-item-headline">{props.educationItem.institutionName.toUpperCase()}</p>
      <p className="list-item-dates">{props.educationItem.dateFrom} - {props.educationItem.dateTo}</p>
      {certificateParaArray(props.educationItem.certificates)}
      {editableButtons}
    </div>
  )
}

EducationItem.propTypes = {
  editable: PropTypes.bool,
  editFunc: PropTypes.func,
  educationItem: PropTypes.object,
  showDeleteFunc: PropTypes.func,
}

const EducationList = (props) => {
  const createEducationList = () => {
    return props.educationArray.map((educationItem) => {
      return <EducationItem
        key={`${educationItem.institutionName}${educationItem.dateFrom}`}
        editable={props.editable}
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

EducationList.defaultProps = {
  editable: false,
  editFunc: () => {},
  showDeleteFunc: () => {},
}

EducationList.propTypes = {
  editable: PropTypes.bool,
  editFunc: PropTypes.func,
  educationArray: PropTypes.array,
  showDeleteFunc: PropTypes.func,
}

export default EducationList
