import { EducationForm, EducationList } from '@components/education'
import { DeleteInfoModal, EditInfoModal } from '@utilities/modals'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'

import { appContext } from '@app'

import style from './style.module.css'

export default function EducationOverview(props) {
  const { 
    activeUser,
    deleteInfo,
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
        deleteFunc={deleteInfo}
        itemID={e.target.dataset.itemId}
        type="education"
      />
    )
  }

  const handleEditClick = (e) => {
    const infoID = e.target.dataset.itemId
    const educationObj = Object.assign({}, requestInfoByID(infoID, 'education'))

    educationObj.dateFrom = revertToDateObject(educationObj.dateFrom)
    educationObj.dateTo = revertToDateObject(educationObj.dateTo)

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
            validateInput={validateCurrentInputValue}
            validateInputSubmission={validateInputSubmission}
          />
        }
      />
    )
  }

  return (
    <main>
      <div className={style.educationPageOverview}>
        {activeModal}
        <EducationForm
          uploadEducationInfo={props.uploadEducationInfo}
          validateInput={validateCurrentInputValue}
          validateInputSubmission={validateInputSubmission}
        />
        <EducationList
          editable={true}
          educationArray={activeUser.education}
          editFunc={handleEditClick}
          showDeleteFunc={handleDeleteClick}
        />
      </div>
    </main>
  )
}

EducationOverview.propTypes = {
  editEducationInfo: PropTypes.func,
  uploadEducationInfo: PropTypes.func,
  userEducationArray: PropTypes.array,
}
