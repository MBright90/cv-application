import PropTypes from 'prop-types'
import React from 'react'

import style from './style.module.css'

export default function CvTemplateHeadlines(props) {
  return (
    <div className={style.cvTemplateHeadlines}>
      <p>
        {props.firstName} <span className={style.bold}>{props.surname}</span>
      </p>
      <p>{props.profession}</p>
    </div>
  )
}

CvTemplateHeadlines.propTypes = {
  firstName: PropTypes.string,
  profession: PropTypes.string,
  surname: PropTypes.string
}
