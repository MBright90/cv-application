import Avatar from '@utilities/avatar'
import PropTypes from 'prop-types'
import React from 'react'

import './style.css'

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
