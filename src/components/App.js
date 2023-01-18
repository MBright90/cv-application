import React, { Component } from 'react'

import Header from './Header'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // Diff pages: home/experience/education/aboutYou
      currentPage: 'home',
    }
  }
  render() {
    return (
      <div className="page-layout">
        <Header />
      </div>
    )
  }
    
}