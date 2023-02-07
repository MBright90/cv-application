import React from 'react'
import PropTypes from 'prop-types'

import Avatar from './Avatar'

const CVTemplate = (props) => {
  return (
    <main>
      <div className="cv-template-overview">
        <div className="cv-template-avatar">
          <Avatar 
            imgSource={props.userInfo.avatarImg}/>
        </div>
        <div className="cv-template-headlines">
          <p>{props.userInfo.firstName} <span className="bold">{props.userInfo.surname}</span></p>
          <p>{props.userInfo.profession}</p>
        </div>
        <div className="cv-template-extras">
          <div>
            <p className="bold">Contact</p>
            <p><i className="fa-solid fa-envelope"></i> {props.userInfo.email}</p>
            <p><i className="fa-solid fa-phone"> {props.userInfo.contactNumber}</i></p>
          </div>
          <div>
            <p className="bold">Reference</p>
            <p><i className="fa-solid fa-user"></i> {props.userInfo.reference.name}</p>
            <p><i className="fa-solid fa-location-dot"></i> {props.userInfo.reference.position}</p>
            <p><i className="fa-solid fa-envelope"></i> {props.userInfo.reference.email}</p>
          </div>
        </div>
        {/* Experience */}
        {/* Education */}
      </div>
    </main>
  )
}

CVTemplate.propTypes = {
  userInfo: PropTypes.object,
}

export default CVTemplate