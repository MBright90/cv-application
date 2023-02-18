import PropTypes from 'prop-types'
import React from 'react'

import './style.css'

export default function CreateTemplateButton(props) {
  return (
    <div className="template-container">
      <button
        className="create-template-btn hover-button"
        onClick={() => props.changePageShown('cv-template')}
      >
        Create Template
      </button>
    </div>
  )
}

CreateTemplateButton.propTypes = {
  changePageShown: PropTypes.func
}
