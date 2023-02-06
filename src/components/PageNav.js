import React, { Component } from 'react'
import PropTypes from 'prop-types'

const NavItem = (props) => {
  let isActive = ''
  if (props.navText.toLowerCase() === props.currentPageShown) isActive = 'active'

  return (
    <li 
      className={isActive}
      onClick={props.onClickFunc}>
      {props.navText}
    </li>
  )
}

NavItem.propTypes = {
  currentPageShown: PropTypes.string,
  onClickFunc: PropTypes.func,
  navText: PropTypes.string,
}

export default class PageNav extends Component {
  constructor(props) {
    super(props)
    this.navArray = this.#createNavArray(props.currentPageShown)

    this.handleNavClick = this.handleNavClick.bind(this)
  }

  #createNavArray(currentPage) {
    const navItems = ['Home', 'Experience', 'Education', 'You']

    return navItems.map((navItem) => {
      return <NavItem 
        currentPageShown={currentPage}
        onClickFunc={(e) => this.handleNavClick(e)}
        navText={navItem}
        key={navItem.toLowerCase()}
      />})
  }

  handleNavClick(e) {
    this.props.changePageShown(e.target.textContent)
    // emphasiseNavChoice(e.target)
    // const navItems = document.querySelectorAll('nav ul li')
    // navItems.forEach((navItem) => {
    //   navItem.textContent === e.target.textContent
    //     ? navItem.classList.add('active')
    //     : navItem.classList.remove('active')
    // })
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
  changePageShown: PropTypes.func,
  currentPageShown: PropTypes.string,
}
