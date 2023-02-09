import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../utilities/Avatar'
import EducationList from '../education/EducationList'
import ExperienceList from '../experience/ExperienceList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faUser, faLocationDot } from '@fortawesome/free-solid-svg-icons'

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
            <p>{props.userInfo.email} <FontAwesomeIcon icon={faEnvelope}/></p>
            <p>{props.userInfo.contactNumber} <FontAwesomeIcon icon={faPhone} /></p>
          </div>
          <div>
            <p className="bold">Reference</p>
            <p>{props.userInfo.reference.name} <FontAwesomeIcon icon={faUser}/></p>
            <p>{props.userInfo.reference.position} <FontAwesomeIcon icon={faLocationDot}/></p>
            <p>{props.userInfo.reference.email} <FontAwesomeIcon icon={faEnvelope}/></p>
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