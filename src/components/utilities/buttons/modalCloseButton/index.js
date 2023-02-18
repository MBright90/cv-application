import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function ModalCloseButton(props) {
  return (
    <button className="modal-close-button" onClick={props.closeModal}>
      <FontAwesomeIcon icon={faX} />
    </button>
  )
}

ModalCloseButton.propTypes = {
  closeModal: PropTypes.func
}
