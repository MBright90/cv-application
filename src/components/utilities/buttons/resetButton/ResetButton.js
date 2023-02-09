import React from 'react'
import PropTypes from 'prop-types'

import './style'

const ResetButton = (props) => {

  return (
    <button
      className="reset-data-button"
      type="button"
      onClick={props.showResetModal}>
            Reset Site Data
    </button>
  )
}
  
ResetButton.propTypes = {
  showResetModal: PropTypes.func,
}

export default ResetButton
