import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.css'

const NavItem = (props) => {
  let isActive = ''
  if (props.navText.toLowerCase() === props.currentPageShown) isActive = 'active'

  return (
    <li className={isActive} onClick={props.onClickFunc}>
      {props.navText}
    </li>
  )
}

NavItem.propTypes = {
  currentPageShown: PropTypes.string,
  onClickFunc: PropTypes.func,
  navText: PropTypes.string
}

export default function PageNav(props) {
  const handleNavClick = (e) => props.changePageShown(e.target.textContent)

  const createNavArray = (currentPage) => {
    const navItems = ['HOME', 'EXPERIENCE', 'EDUCATION', 'YOU']

    return navItems.map((navItem) => {
      return (
        <NavItem
          currentPageShown={currentPage}
          onClickFunc={handleNavClick}
          navText={navItem}
          key={navItem.toLowerCase()}
        />
      )
    })
  }

  return (
    <nav>
      <ul>{createNavArray(props.currentPageShown)}</ul>
    </nav>
  )
}

PageNav.propTypes = {
  changePageShown: PropTypes.func,
  currentPageShown: PropTypes.string
}
