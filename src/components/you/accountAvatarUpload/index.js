import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import Avatar from '@utilities/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons'

export default function AccountAvatarUpload(props) {
  return (
    <div className="avatar-edit-overview">
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
