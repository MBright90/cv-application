import React, { Component } from 'react'
import PropTypes from 'prop-types'

const NavItem = (props) => {
  return (
    <li>
      {props.navText}
    </li>
  )
}

NavItem.propTypes = {
  navText: PropTypes.string
}

export default class PageNav extends Component {
  constructor(props) {
    super(props)
    this.navArray = this.#createNavArray()

    this.handleNavClick = this.handleNavClick.bind(this)
  }

  #createNavArray() {
    const navItems = ['Home', 'Experience', 'Education', 'You']

    return navItems.map((navItem) => <NavItem 
      navText={navItem}
      onClick={this.handleNavClick}
      key={navItem.toLower()}
    />)
  }

  handleNavClick(e) {
    this.props.changePageShown(e.target.textContent)
  }

  render() {
    return (
      <nav>
        <ul>
          {this.navArray}
        </ul>
      </nav>
    )
  }
}

PageNav.propTypes = {
  changePageShown: PropTypes.func
}
