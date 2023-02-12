import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

const CreateTemplateButton = (props) => {
  return (
    <div className="template-container">
      <button
        className="create-template-btn hover-button"
        onClick={() => props.changePageShown('cv-template')}
      >Create Template</button>
    </div>
  )
}
  
CreateTemplateButton.propTypes = {
  changePageShown: PropTypes.func,
}

export default CreateTemplateButton