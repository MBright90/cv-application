import React, { Component } from 'react'

import Header from './Header'
import You from './You'

import Server from '../modules/Server'
const server = new Server()

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 'home',
    }

    this.changePageShown = this.changePageShown.bind(this)
  }

  changePageShown(navChoice) {
    this.setState({currentPage: navChoice})
  }

  render() {
    const mainPage = this.state.currentPage
    let main

    if (mainPage === 'you') main = <You userInfo={server.getCurrentInfo()}/>

    return (
      <div className="page-layout">
        <Header changePageShown={this.changePageShown}/>
        {main}
      </div>
    )
  }
}