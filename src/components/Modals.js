import React from 'react'
import PropTypes from 'prop-types'

const DeleteInfoModal = () => {
  console.log('delete')
}

const EditInfoModal = (props) => {
  return (
    <div className="modal">
      <div className="modal-form-container">
        {props.editForm}
        <button 
          className="modal-close-button"
          onClick={props.closeModal}>
          <i className="fa-solid fa-x"></i>
        </button>
      </div>
    </div>
  )
}

EditInfoModal.propTypes = {
  closeModal: PropTypes.func,
  editForm: PropTypes.object,
}

export { EditInfoModal, DeleteInfoModal }