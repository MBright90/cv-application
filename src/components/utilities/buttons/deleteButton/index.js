import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'

import style from './style.module.css'

export default function DeleteButton(props) {
  return (
    <button
      className={style.deleteButton}
      type="button"
      data-item-id={props.itemID}
      onClick={props.showDeleteFunc}
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  )
}

DeleteButton.propTypes = {
  itemID: PropTypes.string,
  showDeleteFunc: PropTypes.func
}
