import PropTypes from 'prop-types'
import React from 'react'

import style from './style.module.css'

export default function CreateTemplateButton(props) {
  return (
    <div className={style.templateContainer}>
      <button
        className={style.createTemplateBtn}
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
