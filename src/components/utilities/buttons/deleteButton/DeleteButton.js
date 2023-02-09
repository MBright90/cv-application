import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const DeleteButton = (props) => {
  return (
    <button
      className="delete-button"
      type="button"
      data-item-id={props.itemID}
      onClick={props.showDeleteFunc}>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  )
}
  
DeleteButton.propTypes = {
  itemID: PropTypes.string,
  showDeleteFunc: PropTypes.func,
}

export default DeleteButton