import { appContext } from '@app/appContext'
import { ExperienceForm, ExperienceList } from '@components/experience'
import { DeleteInfoModal, EditInfoModal } from '@utilities/modals'
import React, { useContext, useState } from 'react'

import style from './style.module.css'

export default function ExperienceOverview(props) {
  const {
    activeUser,
    deleteInfo,
    editInfo,
    requestInfoByID,
    revertToDateObject,
    uploadExperienceInfo,
    validateCurrentInputValue,
    validateInputSubmission
  } = useContext(appContext)
  const [activeModal, setActiveModal] = useState(null)

  const handleCloseModal = () => setActiveModal(null)

  const handleDeleteClick = (e) => {
    setActiveModal(
      <DeleteInfoModal
        closeModal={handleCloseModal}
        deleteFunc={deleteInfo}
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
            uploadExperienceInfo={editInfo}
            validateInput={validateCurrentInputValue}
            validateInputSubmission={validateInputSubmission}
          />
        }
      />
    )
  }

  return (
    <main>
      <div className={style.experiencePageOverview}>
        {activeModal}
        <ExperienceForm
          uploadExperienceInfo={uploadExperienceInfo}
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
