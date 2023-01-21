import React from 'react'
import PropTypes from 'prop-types'

const Avatar = (props) => {
  const avatarImg = props.imgSource 
    ? URL.createObjectURL(props.imgSource)
    : Avatar.defaultProps.imgSource 

  return (
    <img 
      className="avatar"
      src={avatarImg}
    />
  )
}

Avatar.defaultProps = {
  imgSource: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000'
}

Avatar.propTypes = {
  imgSource: PropTypes.instanceOf(File) || PropTypes.string
}

export default Avatar