import React, { Component } from 'react'

import Header from './Header'
import Footer from './Footer'
import You from './You'

import Server from '../modules/Server'
const server = new Server()

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 'you',
      currentUser: server.getCurrentInfo(),
    }

    this.changePageShown = this.changePageShown.bind(this)
    this.uploadAccountInfo = this.uploadAccountInfo.bind(this)
    this.uploadAvatarChange = this.uploadAvatarChange.bind(this)
  }

  changePageShown(navChoice) {
    this.setState({currentPage: navChoice})
  }

  updateCurrentUser() {
    this.setState({
      currentUser: server.getCurrentInfo()
    })
  }

  // You tab info retrieval functions
  uploadAvatarChange(newImage) {
    server.saveAvatarChange(newImage)
    this.updateCurrentUser(0)
  }

  uploadAccountInfo(accountInfoObject) {
    server.saveAccountInfo(accountInfoObject)
    this.updateCurrentUser()
  }

  render() {
    const mainPage = this.state.currentPage
    let main

    if (mainPage === 'home') console.log('home')
    else if (mainPage === 'experience') console.log('experience')
    else if (mainPage === 'education') console.log('education')
    else if (mainPage === 'you') main = <You 
      uploadAccountInfo={this.uploadAccountInfo}
      uploadAvatarChange={this.uploadAvatarChange}
      userInfo={this.state.currentUser}/>

    return (
      <div className="page-layout">
        <Header changePageShown={this.changePageShown}/>
        {main}
        <Footer />
      </div>
    )
  }
}