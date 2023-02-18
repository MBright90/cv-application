import { ExperienceForm, ExperienceList } from '@components/experience'
import { DeleteInfoModal, EditInfoModal } from '@utilities/modals'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'

import { appContext } from '@app'

import './style.css'

export default function ExperienceOverview(props) {
  const { 
    activeUser,
    deleteFunc,
    requestInfoByID,
    revertToDateObject,
    validateCurrentInputValue,
    validateInputSubmission
  } = useContext(appContext)
  const [activeModal, setActiveModal] = useState(null)

  const handleCloseModal = () => setActiveModal(null)

  const handleDeleteClick = (e) => {
    setActiveModal(
      <DeleteInfoModal
        closeModal={handleCloseModal}
        deleteFunc={deleteFunc}
        itemID={e.target.dataset.infoID}
        type="experience"
      />
    )
  }

  const handleEditClick = (e) => {
    const infoID = e.target.dataset.itemId
    const experienceObj = Object.assign({}, requestInfoByID(infoID, 'experience'))

    experienceObj.dateFrom = revertToDateObject(experienceObj.dateFrom)
    experienceObj.dateTo = revertToDateObject(experienceObj.dateTo)

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
            validateInput={validateCurrentInputValue}
            validateInputSubmission={validateInputSubmission}
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
          validateInput={validateCurrentInputValue}
          validateInputSubmission={validateInputSubmission}
        />
        <ExperienceList
          editable={true}
          experienceArray={activeUser.experience}
          editFunc={handleEditClick}
          showDeleteFunc={handleDeleteClick}
        />
      </div>
    </main>
  )
}

ExperienceOverview.propTypes = {
  editExperienceInfo: PropTypes.func,
  uploadExperienceInfo: PropTypes.func,
  userExperienceArray: PropTypes.array,
}
