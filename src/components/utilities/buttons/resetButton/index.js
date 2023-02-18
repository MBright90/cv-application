import PropTypes from 'prop-types'
import React from 'react'

import './style.css'

export default function ResetButton(props) {
  return (
    <button className="reset-data-button" type="button" onClick={props.showResetModal}>
      Reset Site Data
    </button>
  )
}

ResetButton.propTypes = {
  showResetModal: PropTypes.func
}
