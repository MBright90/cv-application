import App from '@app'
import Server from '@modules/Server'
import React, { createContext, useState } from 'react'

export const appContext = createContext()

const server = new Server()
server.loadFromStorage()

export const AppProvider = () => {
  const [activePage, setActivePage] = useState('home')
  const [activeUser, setActiveUser] = useState(server.getCurrentInfo())

  // Pass multi-use functions to context

  const changePageShown = (navChoice) => {
    setActivePage(navChoice.toLowerCase())
  }

  // info retrieval functions //

  const requestInfoByID = (ID, type) => {
    const info = server.getInfoByID(ID, type)
    return info
  }

  const updateActiveUser = () => {
    const newUserState = server.getCurrentInfo()
    setActiveUser({ ...newUserState })
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

    if (inputEl.type == 'text' || inputEl.nodeName === 'TEXTAREA') {
      if (!checkMinLength(inputEl.value, inputEl.minLength)) isValid = false
    } else if (inputEl.type === 'date') {
      if (!Date.parse(inputEl.value)) isValid = false
    }

    return isValid
  }

  const validateInputSubmission = (inputElementArr) => {
    return server.validateInputSubmission(inputElementArr)
  }

  const contextValue = {
    activePage,
    activeUser,
    updateActiveUser,
    changePageShown,

    deleteInfo,
    editInfo,
    resetAllData,

    requestInfoByID,
    revertToDateObject,

    uploadAccountInfo,
    uploadAvatarChange,
    uploadEducationInfo,
    uploadExperienceInfo,
    uploadReferenceInfo,

    validateCurrentInputValue,
    validateInputSubmission
  }

  return (
    <appContext.Provider value={contextValue}>
      <App />
    </appContext.Provider>
  )
}
