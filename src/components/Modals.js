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
      </div>
    </div>
  )
}

EditInfoModal.propTypes = {
  editForm: PropTypes.object,
}

export { EditInfoModal, DeleteInfoModal }