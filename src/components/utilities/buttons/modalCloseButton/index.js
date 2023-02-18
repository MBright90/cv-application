import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'

import './style.css'

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
