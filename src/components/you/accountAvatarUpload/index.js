import { faCloudUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from '@utilities/avatar'
import PropTypes from 'prop-types'
import React from 'react'

import style from './style.module.css'

export default function AccountAvatarUpload(props) {
  return (
    <div className={style.avatarEditOverview}>
      <Avatar imgSource={props.imgSource} />
      <label htmlFor="avatar-img-upload">
        <input
          id="avatar-img-upload"
          type="file"
          accept="image/png, image/jpeg, image/jpg, .svg"
          onChange={props.handleAvatarUpload}
        />
        <FontAwesomeIcon icon={faCloudUpload} /> Change Image
      </label>
    </div>
  )
}

AccountAvatarUpload.propTypes = {
  handleAvatarUpload: PropTypes.func,
  imgSource: PropTypes.string
}
