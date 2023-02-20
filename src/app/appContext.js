import App from '@app'
import Server from '@modules/Server'
import React, { createContext, useState } from 'react'

export const appContext = createContext()

const server = new Server()
server.loadFromStorage()

export const AppProvider = (children) => {
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
    setActiveUser(newUserState)
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
    changePageShown,
    deleteInfo,
    editInfo,
    server,
    resetAllData,
    requestInfoByID,
    revertToDateObject,
    updateActiveUser,
    validateCurrentInputValue,
    validateInputSubmission
  }

  return (
    <appContext.Provider value={contextValue}>
      <App />
    </appContext.Provider>
  )
}
