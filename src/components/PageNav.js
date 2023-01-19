import React, { Component } from 'react'
import PropTypes from 'prop-types'

const NavItem = (props) => {
  return (
    <li onClick={props.onClickFunc}>
      {props.navText}
    </li>
  )
}

NavItem.propTypes = {
  onClickFunc: PropTypes.func,
  navText: PropTypes.string,
}

export default class PageNav extends Component {
  constructor(props) {
    super(props)
    this.navArray = this.#createNavArray()

    this.handleNavClick = this.handleNavClick.bind(this)
  }

  #createNavArray() {
    const navItems = ['Home', 'Experience', 'Education', 'You']

    return navItems.map((navItem) => {
      return <NavItem 
        onClickFunc={(e) => this.handleNavClick(e)}
        navText={navItem}
        key={navItem.toLowerCase()}
      />})
  }

  handleNavClick(e) {
    this.props.changePageShown(e.target.textContent.toLowerCase())
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
