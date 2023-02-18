import { faEnvelope, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'

import style from './style.module.css'

export default function CvTemplateExtras(props) {
  return (
    <div className={style.cvTemplateExtras}>
      <div>
        <p className={style.bold}>Contact</p>
        <p>
          {props.userEmail} <FontAwesomeIcon icon={faEnvelope} />
        </p>
        <p>
          {props.userContactNumber} <FontAwesomeIcon icon={faPhone} />
        </p>
      </div>
      <div>
        <p className={style.bold}>Reference</p>
        <p>
          {props.reference.name} <FontAwesomeIcon icon={faUser} />
        </p>
        <p>
          {props.reference.position} <FontAwesomeIcon icon={faLocationDot} />
        </p>
        <p>
          {props.reference.email} <FontAwesomeIcon icon={faEnvelope} />
        </p>
      </div>
    </div>
  )
}

CvTemplateExtras.propTypes = {
  reference: PropTypes.object,
  userContactNumber: PropTypes.string,
  userEmail: PropTypes.string
}
