import React from 'react'
import PropTypes from 'prop-types'

import { EducationInput } from './Education'
import { ExperienceInput } from './Experience'

const DeleteInfoModal = () => {
  console.log('delete')
}

const EditInfoModal = (props) => {

  //   const editInfoType = props.typeOfInfo
  //   let editForm
  
  //   if (editInfoType =='education') editForm = <EducationInput />
  //   else editForm = <ExperienceInput />

  const editForm = props.editForm

  return (
    <div className="modal">
      {editForm}
    </div>
  )
}

EditInfoModal.propTypes = {
  editForm: PropTypes.string,
}

export { EditInfoModal, DeleteInfoModal }