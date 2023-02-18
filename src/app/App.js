import React, { useState } from 'react'

import './style.css'
import { Header, Footer } from '@components/nav'
import HomeOverview, { CvTemplateOverview } from '@components/home'
import EducationOverview from '@components/education'
import ExperienceOverview from '@components/experience'
import YouOverview from '@components/you'

import Server from '@modules/Server'

const server = new Server()
server.loadFromStorage()

export default function App(props) {
  const [activePage, setActivePage] = useState('home')
  const [activeUser, setActiveUser] = useState(server.getCurrentInfo())

  const changePageShown = (navChoice) => {
    setActivePage(navChoice.toLowerCase())

    const navItems = document.querySelectorAll('nav ul li')
    navItems.forEach((navItem) => {
      navItem.textContent === navChoice
        ? navItem.classList.add('active')
        : navItem.classList.remove('active')
    })
  }

  // info retrieval functions //

  const requestInfoByID = (ID, type) => {
    const info = server.getInfoByID(ID, type)
    return info
  }

  const updateActiveUser = () => {
    const newUserState = server.getCurrentInfo()
    setActiveUser(newUserState)
  }

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
      // Add 1ms delay server to save user object
      .then(() => setTimeout(updateActiveUser, 1))
  }

  const uploadEducationInfo = (inputValues, infoID) => {
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

  // Edit and delete button functions //

  const deleteInfo = (infoID, type) => {
    server.deleteInfo(infoID, type)
    updateActiveUser()
  }

  const editInfo = (inputValues, infoID, type) => {
    if (type === 'education') uploadEducationInfo(inputValues, infoID)
    else uploadExperienceInfo(inputValues, infoID)
  }

  const revertToDateObject = (formattedDate) => {
    return server.revertDate(formattedDate)
  }

  const resetAllData = () => {
    server.clearStorage()
    updateActiveUser()
  }

  // Validation passing functions

  const validateCurrentInputValue = (inputEl) => {
    const checkMinLength = (value, minLength) => {
      if (value.length >= parseInt(minLength, 10)) return true
    }

    let isValid = true
    let errorMessage

    if (inputEl.type == 'text' || inputEl.nodeName === 'TEXTAREA') {
      if (!checkMinLength(inputEl.value, inputEl.minLength)) {
        errorMessage = `Please include at least ${inputEl.minLength} characters`
        isValid = false
      }
    } else if (inputEl.type === 'date') {
      if (!Date.parse(inputEl.value)) {
        errorMessage = 'This date is required'
        isValid = false
      }
    }

    if (!isValid) {
      inputEl.classList.add('invalid')
      return errorMessage
    } else {
      inputEl.classList.remove('invalid')
      return ''
    }
  }

  const validateInputSubmission = (inputElementArr) => {
    return server.validateInputSubmission(inputElementArr)
  }

  let main
  if (activePage === 'home') main = <HomeOverview changePageShown={changePageShown} />
  else if (activePage === 'experience')
    main = (
      <ExperienceOverview
        deleteFunc={deleteInfo}
        editExperienceInfo={editInfo}
        requestInfoByID={requestInfoByID}
        revertToDateObject={revertToDateObject}
        uploadExperienceInfo={uploadExperienceInfo}
        userExperienceArray={activeUser.experience}
        validateInput={validateCurrentInputValue}
        validateInputSubmission={validateInputSubmission}
      />
    )
  else if (activePage === 'education')
    main = (
      <EducationOverview
        deleteFunc={deleteInfo}
        editEducationInfo={editInfo}
        requestInfoByID={requestInfoByID}
        revertToDateObject={revertToDateObject}
        uploadEducationInfo={uploadEducationInfo}
        userEducationArray={activeUser.education}
        validateInput={validateCurrentInputValue}
        validateInputSubmission={validateInputSubmission}
      />
    )
  else if (activePage === 'you')
    main = (
      <YouOverview
        resetFunc={resetAllData}
        uploadAccountInfo={uploadAccountInfo}
        uploadAvatarChange={uploadAvatarChange}
        uploadReferenceInfo={uploadReferenceInfo}
        userInfo={activeUser}
        validateInput={validateCurrentInputValue}
        validateInputSubmission={validateInputSubmission}
      />
    )
  else if (activePage === 'cv-template') main = <CvTemplateOverview userInfo={activeUser} />

  return (
    <div className="page-layout">
      <Header currentPageShown={activePage} changePageShown={changePageShown} />
      {main}
      <Footer />
    </div>
  )
}
