import React, { Component } from 'react'

import Header from './Header'
import Footer from './Footer'
import Education from './Education'
import You from './You'

import Server from '../modules/Server'
const server = new Server()
server.loadFromStorage()

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 'you',
      currentUser: server.getCurrentInfo(),
    }

    this.changePageShown = this.changePageShown.bind(this)
    this.updateCurrentUser = this.updateCurrentUser.bind(this)
    this.uploadAccountInfo = this.uploadAccountInfo.bind(this)
    this.uploadAvatarChange = this.uploadAvatarChange.bind(this)
    this.uploadEducationInfo = this.uploadEducationInfo.bind(this)
  }

  changePageShown(navChoice) {
    this.setState({currentPage: navChoice})
  }

  updateCurrentUser() {
    const newUserState = server.getCurrentInfo()
    this.setState({
      currentUser: newUserState
    })
  }

  // 'You' tab info retrieval functions //

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
    const educationObj = {
      institutionName: inputValues[0],
      certificate: inputValues[1],
      dateFrom: inputValues[2],
      dateTo: inputValues[3],
    }
    console.log(educationObj)
    console.log('bewbs')
    // server.updateEducationInfo(educationObj)
  }

  render() {
    const mainPage = this.state.currentPage
    let main

    if (mainPage === 'home') console.log('home')
    else if (mainPage === 'experience') console.log('experience')
    else if (mainPage === 'education') main = <Education
      uploadEducationInfo={this.uploadEducationInfo}
      userEducationArray={this.state.currentUser.education}
    />

    else if (mainPage === 'you') main = <You 
      uploadAccountInfo={this.uploadAccountInfo}
      uploadAvatarChange={this.uploadAvatarChange}
      userInfo={this.state.currentUser}/>

    return (
      <div className="page-layout">
        <Header
          currentPageShown={this.state.currentPage} 
          changePageShown={this.changePageShown}/>
        {main}
        <Footer />
      </div>
    )
  }
}