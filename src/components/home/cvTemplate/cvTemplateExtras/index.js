import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faUser, faLocationDot } from '@fortawesome/free-solid-svg-icons'

export default function CvTemplateExtras(props) {
  return (
    <div className="cv-template-extras">
      <div>
        <p className="bold">Contact</p>
        <p>
          {props.userEmail} <FontAwesomeIcon icon={faEnvelope} />
        </p>
        <p>
          {props.userContactNumber} <FontAwesomeIcon icon={faPhone} />
        </p>
      </div>
      <div>
        <p className="bold">Reference</p>
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
