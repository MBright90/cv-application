import React from 'react'
import PropTypes from 'prop-types'

import Avatar from './Avatar'
import EducationList from './EducationList'
import ExperienceList from './ExperienceList'

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
            <p>{props.userInfo.email} <i className="fa-solid fa-envelope"></i></p>
            <p>{props.userInfo.contactNumber} <i className="fa-solid fa-phone"></i></p>
          </div>
          <div>
            <p className="bold">Reference</p>
            <p>{props.userInfo.reference.name} <i className="fa-solid fa-user"></i></p>
            <p>{props.userInfo.reference.position} <i className="fa-solid fa-location-dot"></i></p>
            <p>{props.userInfo.reference.email} <i className="fa-solid fa-envelope"></i></p>
          </div>
        </div>
        <div>
          <p className="bold cv-template-list-title">Experience</p>
          <ExperienceList 
            experienceArray={props.userInfo.experience}/>
        </div>
        <div>
          <p className="bold cv-template-list-title">Education</p>
          <EducationList 
            educationArray={props.userInfo.education}/>
        </div>
        
      </div>
    </main>
  )
}

CVTemplate.propTypes = {
  userInfo: PropTypes.object,
}

export default CVTemplate