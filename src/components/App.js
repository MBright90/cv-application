import React, { Component } from 'react'

import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Education from './Education'
import Experience from './Experience'
import You from './You'

// import { EditInfoModal, DeleteModal } from './Modals'

import Server from '../modules/Server'
const server = new Server()
// server.clearStorage()
server.loadFromStorage()

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeModal: false,
      currentPage: 'home',
      currentUser: server.getCurrentInfo()
    }

    this.changePageShown = this.changePageShown.bind(this)
    this.requestInfoByID = this.requestInfoByID.bind(this)
    this.revertToDateObject = this.revertToDateObject.bind()
    this.updateCurrentUser = this.updateCurrentUser.bind(this)
    this.uploadAccountInfo = this.uploadAccountInfo.bind(this)
    this.uploadAvatarChange = this.uploadAvatarChange.bind(this)
    this.uploadEducationInfo = this.uploadEducationInfo.bind(this)
    this.uploadExperienceInfo = this.uploadExperienceInfo.bind(this)
    this.uploadReferenceInfo = this.uploadReferenceInfo.bind(this)
  }

  changePageShown(navChoice) {
    this.setState({currentPage: navChoice})
  }

  // info retrieval functions //

  requestInfoByID(ID, type) {
    const info = server.getInfoByID(ID, type)
    return info
  }

  updateCurrentUser() {
    const newUserState = server.getCurrentInfo()
    this.setState({
      currentUser: newUserState
    })
  }

  // info upload functions //

  uploadAccountInfo(inputValues) {
    const accountInfoObj = {
      firstName: inputValues[0],
      surname: inputValues[1],
      email: inputValues[2],
      contactNumber: inputValues[3],
    }
    server.updateAccountInfo(accountInfoObj)
    this.updateCurrentUser()
  }

  async uploadAvatarChange(newImage) {
    await server.updateAvatarChange(newImage)
      // Add 1ms delay server to save user object
      .then(() => setTimeout(this.updateCurrentUser, 1))
  }

  uploadEducationInfo(inputValues) {

    const certificateSplice = inputValues.slice(3)
    const educationObj = {
      institutionName: inputValues[0],
      dateFrom: inputValues[1],
      dateTo: inputValues[2],
      certificates: certificateSplice,
    }

    server.createEducationInfo(educationObj)
    this.updateCurrentUser()
  }

  uploadExperienceInfo(inputValues) {
    const experienceObj = {
      workplaceName: inputValues[0],
      dateFrom: inputValues[1],
      dateTo: inputValues[2],
      experienceSummary: inputValues[3]
    }

    server.createExperienceInfo(experienceObj)
    this.updateCurrentUser()
  }

  uploadReferenceInfo(inputValues) {
    const referenceObj = {
      name: inputValues[0],
      position: inputValues[1],
      email: inputValues[2]
    }
    console.log(referenceObj)
  }

  // Edit and delete button functions //
  revertToDateObject(formattedDate) {
    return server.revertDate(formattedDate)
  }

  // Modal functions

  render() {
    const mainPage = this.state.currentPage
    let main

    if (mainPage === 'home') main = <Home />
    else if (mainPage === 'experience') main = <Experience
      requestInfoByID={this.requestInfoByID}
      revertToDateObject={this.revertToDateObject}
      uploadExperienceInfo={this.uploadExperienceInfo}
      userExperienceArray={this.state.currentUser.experience}
    />
    else if (mainPage === 'education') main = <Education
      requestInfoByID={this.requestInfoByID}
      uploadEducationInfo={this.uploadEducationInfo}
      userEducationArray={this.state.currentUser.education}
    />
    else main = <You 
      uploadAccountInfo={this.uploadAccountInfo}
      uploadAvatarChange={this.uploadAvatarChange}
      uploadReferenceInfo={this.uploadReferenceInfo}
      userInfo={this.state.currentUser}/>

    return (
      <div className="page-layout">
        <Header
          currentPageShown={this.state.currentPage} 
          changePageShown={this.changePageShown}/>
        {main}
        <Footer />
        {this.state.activeModal}
      </div>
    )
  }
}

// TODO: Create modal to edit previous data