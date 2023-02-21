import { appContext } from '@app/appContext'
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from '@utilities/avatar'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import style from './style.module.css'

export default function AccountAvatarUpload() {
  const { activeUser, uploadAvatarChange } = useContext(appContext)

  const handleAvatarUpload = (e) => uploadAvatarChange(e.target.files[0])

  return (
    <div className={style.avatarEditOverview}>
      <Avatar imgSource={activeUser.avatarImg} />
      <label htmlFor="avatar-img-upload">
        <input
          id="avatar-img-upload"
          type="file"
          accept="image/png, image/jpeg, image/jpg, .svg"
          onChange={handleAvatarUpload}
        />
        <FontAwesomeIcon icon={faCloudUpload} /> Change Image
      </label>
    </div>
  )
}
