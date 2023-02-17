import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import ModalCloseButton from '../../buttons/modalCloseButton/ModalCloseButton'

export default function DeleteInfoModal(props) {
  const handleDeleteClick = (e) => {
    const infoID = e.target.dataset.itemId
    const infoType = e.target.dataset.type

    props.deleteFunc(infoID, infoType)
    props.closeModal()
  }

  return (
    <div className="modal">
      <div className="modal-form-container">
        <div className="confirm-container">
          <p>Are you sure you want to delete this?</p>
          <button data-item-id={props.itemID} data-type={props.type} onClick={handleDeleteClick}>
            Confirm
          </button>
        </div>
        <ModalCloseButton closeModal={props.closeModal} />
      </div>
    </div>
  )
}

DeleteInfoModal.propTypes = {
  closeModal: PropTypes.func,
  deleteFunc: PropTypes.func,
  itemID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string
}
