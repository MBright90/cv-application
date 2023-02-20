import EducationOverview from '@components/education'
import ExperienceOverview from '@components/experience'
import HomeOverview, { CvTemplateOverview } from '@components/home'
import { Footer, Header } from '@components/nav'
import YouOverview from '@components/you'
import ErrorPage from '@utilities/error'
import React, { useContext } from 'react'

import { appContext } from './appContext'
import style from './style.module.css'

export default function App() {
  const { activePage, changePageShown, server, updateActiveUser } = useContext(appContext)

  // info upload functions //

  const uploadAccountInfo = (inputValues) => {
    const accountInfoObj = {
      firstName: inputValues[0],
      surname: inputValues[1],
      email: inputValues[2],
      contactNumber: inputValues[3],
      profession: inputValues[4]
    }
    server.updateAccountInfo(accountInfoObj)
    updateActiveUser()
  }

  async function uploadAvatarChange(newImage) {
    await server
      .updateAvatarChange(newImage)
      // Add 1ms delay server to save user object. Avatar does not update properly due to length of time
      // to parse and save the file, so by adding a setTimeout, it ensures that the file is saved and prepared
      // before it updates the activeUser, which immediately shows the updated image.
      .then(setTimeout(updateActiveUser, 1))
  }

  async function uploadEducationInfo(inputValues, infoID) {
    const certificateSplice = server.removeEmptyFields(inputValues.slice(3))
    const educationObj = {
      institutionName: inputValues[0],
      dateFrom: inputValues[1],
      dateTo: inputValues[2],
      certificates: certificateSplice
    }

    server.createEducationInfo(educationObj, infoID)
    updateActiveUser()
  }

  const uploadExperienceInfo = (inputValues, infoID) => {
    const experienceObj = {
      workplaceName: inputValues[0],
      dateFrom: inputValues[1],
      dateTo: inputValues[2],
      experienceSummary: inputValues[3]
    }

    server.createExperienceInfo(experienceObj, infoID)
    updateActiveUser()
  }

  const uploadReferenceInfo = (inputValues) => {
    const referenceObj = {
      name: inputValues[0],
      position: inputValues[1],
      email: inputValues[2]
    }
    server.updateReferenceInfo(referenceObj)
  }

  let main
  if (activePage === 'home') main = <HomeOverview changePageShown={changePageShown} />
  else if (activePage === 'experience')
    main = <ExperienceOverview uploadExperienceInfo={uploadExperienceInfo} />
  else if (activePage === 'education')
    main = <EducationOverview uploadEducationInfo={uploadEducationInfo} />
  else if (activePage === 'you')
    main = (
      <YouOverview
        uploadAccountInfo={uploadAccountInfo}
        uploadAvatarChange={uploadAvatarChange}
        uploadReferenceInfo={uploadReferenceInfo}
      />
    )
  else if (activePage === 'cv-template') main = <CvTemplateOverview />
  else main = <ErrorPage />

  return (
    <div className={style.pageLayout}>
      <Header />
      {main}
      <Footer />
    </div>
  )
}
