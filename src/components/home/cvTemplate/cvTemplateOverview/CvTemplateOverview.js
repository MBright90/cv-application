import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

import CvTemplateAvatar from '@components/home/cvTemplate/cvTemplateAvatar/CvTemplateAvatar'
import CvTemplateHeadlines from '@components/home/cvTemplate/cvTemplateHeadlines/CvTemplateHeadlines'
import CvTemplateExtras from '@components/home/cvTemplate/cvTemplateExtras/CvTemplateExtras'
import EducationList from '@components/education/educationList/EducationList'
import ExperienceList from '@components/experience/experienceList/ExperienceList'

const CvTemplateOverview = (props) => {
  return (
    <main>
      <div className="cv-template-overview">
        <CvTemplateAvatar 
          imgSource={props.userInfo.avatarImg}
        />
        <CvTemplateHeadlines 
          firstName={props.userInfo.firstName}
          profession={props.userInfo.profession}
          surname={props.userInfo.surname}
        />
        <CvTemplateExtras 
          reference={props.userInfo.reference}
          userContactNumber={props.userInfo.contactNumber}
          userEmail={props.userInfo.email}
        />
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

CvTemplateOverview.propTypes = {
  userInfo: PropTypes.object,
}

export default CvTemplateOverview