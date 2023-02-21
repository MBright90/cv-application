import { appContext } from '@app/appContext'
import { DeleteButton, EditButton } from '@utilities/buttons'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import style from './style.module.css'

const EducationItem = (props) => {
  const certificateParaArray = (certificateArray) => {
    return certificateArray.map((certificate) => {
      return (
        <p key={certificate} className={style.listItemDetails}>
          {certificate}
        </p>
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
    <div className={style.listItem}>
      <p className={style.listItemHeadline}>{props.educationItem.institutionName.toUpperCase()}</p>
      <p className={style.listItemDates}>
        {props.educationItem.dateFrom} - {props.educationItem.dateTo}
      </p>
      {certificateParaArray(props.educationItem.certificates)}
      {editableButtons}
    </div>
  )
}

EducationItem.propTypes = {
  editable: PropTypes.bool,
  editFunc: PropTypes.func,
  educationItem: PropTypes.object,
  showDeleteFunc: PropTypes.func
}

export default function EducationList(props) {
  const { activeUser } = useContext(appContext)

  const createEducationList = () => {
    return activeUser.education.map((educationItem) => {
      return (
        <EducationItem
          key={`${educationItem.institutionName}${educationItem.dateFrom}`}
          editable={props.editable}
          editFunc={props.editFunc}
          educationItem={educationItem}
          showDeleteFunc={props.showDeleteFunc}
        />
      )
    })
  }

  return <div className={style.educationListOverview}>{createEducationList()}</div>
}

EducationList.defaultProps = {
  editable: false,
  editFunc: () => {},
  showDeleteFunc: () => {}
}

EducationList.propTypes = {
  editable: PropTypes.bool,
  editFunc: PropTypes.func,
  showDeleteFunc: PropTypes.func
}
