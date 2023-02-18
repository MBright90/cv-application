import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

import { CvTemplateAvatar, CvTemplateHeadlines, CvTemplateExtras } from '@components/home/cvTemplate'
import { EducationList } from '@components/education'
import { ExperienceList } from '@components/experience'

export default function CvTemplateOverview(props) {
  return (
    <main>
      <div className="cv-template-overview">
        <CvTemplateAvatar imgSource={props.userInfo.avatarImg} />
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
          <ExperienceList experienceArray={props.userInfo.experience} />
        </div>
        <div>
          <p className="bold cv-template-list-title">Education</p>
          <EducationList educationArray={props.userInfo.education} />
        </div>
      </div>
    </main>
  )
}

CvTemplateOverview.propTypes = {
  userInfo: PropTypes.object
}