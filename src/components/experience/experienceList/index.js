import { DeleteButton, EditButton } from '@utilities/buttons'
import PropTypes from 'prop-types'
import React from 'react'

import './style.css'

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
    <div className={style.listItem}>
      <p className={style.listItemHeadline}>{props.experienceItem.workplaceName.toUpperCase()}</p>
      <p className={style.listItemDates}>
        {props.experienceItem.dateFrom} - {props.experienceItem.dateTo}
      </p>
      <p className={style.listItemDetails}>{props.experienceItem.experienceSummary}</p>
      {editableButtons}
    </div>
  )
}

ExperienceItem.propTypes = {
  editable: PropTypes.bool,
  editFunc: PropTypes.func,
  experienceItem: PropTypes.object,
  showDeleteFunc: PropTypes.func
}

export default function ExperienceList(props) {
  const createExperienceList = () => {
    return props.experienceArray.map((experienceItem) => {
      return (
        <ExperienceItem
          key={`${experienceItem.workplaceName}${experienceItem.dateFrom}`}
          editable={props.editable}
          editFunc={props.editFunc}
          experienceItem={experienceItem}
          showDeleteFunc={props.showDeleteFunc}
        />
      )
    })
  }

  return <div className={style.experienceListOverview}>{createExperienceList()}</div>
}

ExperienceList.defaultProps = {
  editable: false,
  editFunc: () => {},
  showDeleteFunc: () => {}
}

ExperienceList.propTypes = {
  editable: PropTypes.bool,
  editFunc: PropTypes.func,
  experienceArray: PropTypes.array,
  showDeleteFunc: PropTypes.func
}
