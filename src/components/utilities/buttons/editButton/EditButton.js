import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const EditButton = (props) => {
  return (
    <button
      className="edit-button"
      type="button"
      data-item-id={props.itemID}
      onClick={props.editFunc}
    >
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  )
}

EditButton.propTypes = {
  editFunc: PropTypes.func,
  itemID: PropTypes.string
}

export default EditButton
