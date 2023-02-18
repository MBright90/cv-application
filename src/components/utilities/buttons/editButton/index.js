import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'

import style from './style.module.css'

export default function EditButton(props) {
  return (
    <button
      className={style.editButton}
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
