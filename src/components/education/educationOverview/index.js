import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './style.css'
import { EducationForm, EducationList } from '@components/education'
import { DeleteInfoModal, EditInfoModal } from '@utilities/modals'

export default function EducationOverview(props) {
  const [activeModal, setActiveModal] = useState(null)

  const handleCloseModal = () => setActiveModal(null)

  const handleDeleteClick = (e) => {
    setActiveModal(
      <DeleteInfoModal
        closeModal={handleCloseModal}
        deleteFunc={props.deleteFunc}
        itemID={e.target.dataset.itemId}
        type="education"
      />
    )
  }

  const handleEditClick = (e) => {
    const infoID = e.target.dataset.itemId
    const educationObj = Object.assign({}, props.requestInfoByID(infoID, 'education'))

    educationObj.dateFrom = props.revertToDateObject(educationObj.dateFrom)
    educationObj.dateTo = props.revertToDateObject(educationObj.dateTo)

    setActiveModal(
      <EditInfoModal
        closeModal={handleCloseModal}
        editForm={
          <EducationForm
            closeModal={handleCloseModal}
            educationItem={educationObj}
            formType="Edit"
            itemID={infoID}
            uploadEducationInfo={props.editEducationInfo}
            validateInput={props.validateInput}
            validateInputSubmission={props.validateInputSubmission}
          />
        }
      />
    )
  }

  return (
    <main>
      <div className="education-page-overview">
        {activeModal}
        <EducationForm
          uploadEducationInfo={props.uploadEducationInfo}
          validateInput={props.validateInput}
          validateInputSubmission={props.validateInputSubmission}
        />
        <EducationList
          editable={true}
          educationArray={props.userEducationArray}
          editFunc={handleEditClick}
          showDeleteFunc={handleDeleteClick}
        />
      </div>
    </main>
  )
}

EducationOverview.propTypes = {
  closeModal: PropTypes.func,
  deleteFunc: PropTypes.func,
  editEducationInfo: PropTypes.func,
  requestInfoByID: PropTypes.func,
  revertToDateObject: PropTypes.func,
  uploadEducationInfo: PropTypes.func,
  userEducationArray: PropTypes.array,
  validateInput: PropTypes.func,
  validateInputSubmission: PropTypes.func
}
