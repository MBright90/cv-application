import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default function CvTemplateHeadlines(props) {
  return (
    <div className="cv-template-headlines">
      <p>
        {props.firstName} <span className="bold">{props.surname}</span>
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
