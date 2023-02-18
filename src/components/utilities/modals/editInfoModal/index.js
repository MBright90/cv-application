import { ModalCloseButton } from '@utilities/buttons'
import PropTypes from 'prop-types'
import React from 'react'

import './style.css'

export default function EditInfoModal(props) {
  return (
    <div className="modal">
      <div className="modal-form-container">
        {props.editForm}
        <ModalCloseButton closeModal={props.closeModal} />
      </div>
    </div>
  )
}

EditInfoModal.propTypes = {
  closeModal: PropTypes.func,
  editForm: PropTypes.object
}
