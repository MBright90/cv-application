import { EducationList } from '@components/education'
import { ExperienceList } from '@components/experience'
import {
  CvTemplateAvatar,
  CvTemplateExtras,
  CvTemplateHeadlines
} from '@components/home/cvTemplate'
import React, { useContext } from 'react'

import { appContext } from '../../../../app'

import style from './style.module.css'

export default function CvTemplateOverview(props) {
  const activeUser = useContext(appContext)

  return (
    <main>
      <div className={style.cvTemplateOverview}>
        <CvTemplateAvatar imgSource={activeUser.avatarImg} />
        <CvTemplateHeadlines
          firstName={activeUser.firstName}
          profession={activeUser.profession}
          surname={activeUser.surname}
        />
        <CvTemplateExtras
          reference={activeUser.reference}
          userContactNumber={activeUser.contactNumber}
          userEmail={activeUser.email}
        />
        <div>
          <p className={`${style.cvTemplateListTitle} ${style.bold}`}>Experience</p>
          <ExperienceList experienceArray={activeUser.experience} />
        </div>
        <div>
          <p className={`${style.cvTemplateListTitle} ${style.bold}`}>Education</p>
          <EducationList educationArray={activeUser.education} />
        </div>
      </div>
    </main>
  )
}
