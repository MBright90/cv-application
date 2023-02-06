import React from 'react'
import PropTypes from 'prop-types'

const ModalCloseButton = (props) => {
  return (
    <button 
      className="modal-close-button"
      onClick={props.closeModal}>
      <i className="fa-solid fa-x"></i>
    </button>
  )
}

ModalCloseButton.propTypes = {
  closeModal: PropTypes.func,
}

const EditInfoModal = (props) => {
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
  editForm: PropTypes.object,
}

const DeleteInfoModal = (props) => {

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
          <button
            data-item-id={props.itemID}
            data-type={props.type}
            onClick={handleDeleteClick}
          >Confirm</button>
        </div>
        <ModalCloseButton closeModal={props.closeModal} />
      </div>
    </div>
  )
}

DeleteInfoModal.propTypes = {
  closeModal: PropTypes.func,
  deleteFunc: PropTypes.func,
  itemID: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  type: PropTypes.string,
}

const ResetInfoModal = (props) => {

  const handleResetClick = () => {
    props.resetFunc()
    props.closeModal()
  }

  return (
    <div className="modal">
      <div className="modal-form-container">
        <div className="confirm-container">
          <p>This action cannot be reversed. Are you sure you wish to clear all data?</p>
          <button
            onClick={handleResetClick}
          >Confirm</button>
        </div>
        <ModalCloseButton closeModal={props.closeModal} />
      </div>
    </div>
  )
}

ResetInfoModal.propTypes = {
  closeModal: PropTypes.func,
  resetFunc: PropTypes.func,
}

export { EditInfoModal, DeleteInfoModal, ResetInfoModal }