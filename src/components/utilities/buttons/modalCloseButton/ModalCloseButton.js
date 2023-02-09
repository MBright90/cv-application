import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

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

export default ModalCloseButton