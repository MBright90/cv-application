import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { appContext } from '@app/appContext'

import style from './style.module.css'

const NavItem = (props) => {
  return (
    <li 
      className={props.isActive? style.active : null}
      onClick={props.handleNavClick}>
      {props.navText}
    </li>
  )
}

NavItem.propTypes = {
  handleNavClick: PropTypes.func,
  isActive: PropTypes.bool,
  navText: PropTypes.string
}

export default function PageNav() {
  const { activePage, changePageShown } = useContext(appContext)

  const createNavArray = () => {
    const navItems = ['HOME', 'experience', 'education', 'you']

    return navItems.map((navItem) => {
      return (
        <NavItem
          handleNavClick={(e) => changePageShown(e.target.textContent)}
          isActive={navItem === activePage}
          navText={navItem.toUpperCase()}
          key={navItem}
        />
      )
    })
  }

  return (
    <nav>
      <ul>{createNavArray()}</ul>
    </nav>
  )
}
