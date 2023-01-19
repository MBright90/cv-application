import React, { Component } from 'react'

import Header from './Header'

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
    return (
      <div className="page-layout">
        <Header changePageShown={this.changePageShown}/>
      </div>
    )
  }
    
}