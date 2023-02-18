import { ExperienceForm, ExperienceList } from '@components/experience'
import { DeleteInfoModal, EditInfoModal } from '@utilities/modals'
import PropTypes from 'prop-types'
import React, { Component, useState } from 'react'

import './style.css'

export default function ExperienceOverview(props) {
  const [activeModal, setActiveModal] = useState(null)

  const handleCloseModal = () => setActiveModal(null)

  const handleDeleteClick = (e) => {
    setActiveModal(
      <DeleteInfoModal
        closeModal={handleCloseModal}
        deleteFunc={props.deleteFunc}
        itemID={e.target.dataset.infoID}
        type="experience"
      />
    )
  }

  const handleEditClick = (e) => {
    const infoID = e.target.dataset.itemId
    const experienceObj = Object.assign({}, props.requestInfoByID(infoID, 'experience'))

    experienceObj.dateFrom = props.revertToDateObject(experienceObj.dateFrom)
    experienceObj.dateTo = props.revertToDateObject(experienceObj.dateTo)

    setActiveModal(
      <EditInfoModal
        closeModal={handleCloseModal}
        editForm={
          <ExperienceForm
            closeModal={handleCloseModal}
            experienceItem={experienceObj}
            formType="Edit"
            itemID={infoID}
            uploadExperienceInfo={props.editExperienceInfo}
            validateInput={props.validateInput}
            validateInputSubmission={props.validateInputSubmission}
          />
        }
      />
    )
  }

  return (
    <main>
      <div className="experience-page-overview">
        {activeModal}
        <ExperienceForm
          uploadExperienceInfo={props.uploadExperienceInfo}
          validateInput={props.validateInput}
          validateInputSubmission={props.validateInputSubmission}
        />
        <ExperienceList
          editable={true}
          experienceArray={props.userExperienceArray}
          editFunc={handleEditClick}
          showDeleteFunc={handleDeleteClick}
        />
      </div>
    </main>
  )
}

ExperienceOverview.propTypes = {
  closeModal: PropTypes.func,
  deleteFunc: PropTypes.func,
  editExperienceInfo: PropTypes.func,
  requestInfoByID: PropTypes.func,
  revertToDateObject: PropTypes.func,
  uploadExperienceInfo: PropTypes.func,
  userExperienceArray: PropTypes.array,
  validateInput: PropTypes.func,
  validateInputSubmission: PropTypes.func
}
