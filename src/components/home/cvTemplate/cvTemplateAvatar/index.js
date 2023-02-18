import Avatar from '@utilities/avatar'
import PropTypes from 'prop-types'
import React from 'react'

import style from './style.module.css'

export default function CvTemplateAvatar(props) {
  return (
    <div className={style.cvTemplateAvatar}>
      <Avatar imgSource={props.imgSource} />
    </div>
  )
}

CvTemplateAvatar.propTypes = {
  imgSource: PropTypes.string
}
