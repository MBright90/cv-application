import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../../utilities/avatar/Avatar'

const AccountAvatarUpload = (props) => {
  return (
    <div className="avatar-edit-overview">
      <Avatar imgSource={props.imgSource}/>
      <label htmlFor="avatar-img-upload">
        <input
          id="avatar-img-upload"
          type="file"
          accept="image/png, image/jpeg, image/jpg, .svg"
          onChange={props.handleAvatarUpload}/>
        <i className="fa fa-cloud-upload"></i> Change Image
      </label>
      
    </div>
  )
}

AccountAvatarUpload.propTypes = {
  handleAvatarUpload: PropTypes.func,
  imgSource: PropTypes.string,
}

export default AccountAvatarUpload