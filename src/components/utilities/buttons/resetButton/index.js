import PropTypes from 'prop-types'
import React from 'react'

import style from './style.module.css'

export default function ResetButton(props) {
  return (
    <button className={style.resetDataButton} type="button" onClick={props.showResetModal}>
      Reset Site Data
    </button>
  )
}

ResetButton.propTypes = {
  showResetModal: PropTypes.func
}
