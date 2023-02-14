import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import Avatar from '@components/utilities/avatar/Avatar'

const CvTemplateAvatar = (props) => {
  return (
    <div className="cv-template-avatar">
      <Avatar 
        imgSource={props.imgSource}/>
    </div>
  )
}

CvTemplateAvatar.propTypes = {
  imgSource: PropTypes.string
}

export default CvTemplateAvatar