import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import ModalCloseButton from '../../buttons/modalCloseButton/ModalCloseButton'

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
        <ModalCloseButton closeModal={props.closeModal}/>
      </div>
    </div>
  )
}
  
ResetInfoModal.propTypes = {
  closeModal: PropTypes.func,
  resetFunc: PropTypes.func,
}