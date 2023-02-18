import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import Avatar from '@utilities/avatar'

export default function CvTemplateAvatar(props) {
  return (
    <div className="cv-template-avatar">
      <Avatar imgSource={props.imgSource} />
    </div>
  )
}

CvTemplateAvatar.propTypes = {
  imgSource: PropTypes.string
}
