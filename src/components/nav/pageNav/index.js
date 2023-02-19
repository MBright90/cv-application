import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { appContext } from '@app'

import './style.module.css'

const NavItem = (props) => {
  const {activePage, changePageShown} = useContext(appContext)

  if (props.navText.toLowerCase() === activePage) 
    return (
      <li className={style.active} onClick={(e) => changePageShown(e.target.textContent)}>
      {props.navText}
    </li>
    ) 

  return (
    <li onClick={(e) => changePageShown(e.target.textContent)}>
      {props.navText}
    </li>
  )
}

NavItem.propTypes = {
  navText: PropTypes.string
}

export default function PageNav(props) {

  const createNavArray = () => {
    const navItems = ['HOME', 'EXPERIENCE', 'EDUCATION', 'YOU']

    return navItems.map((navItem) => {
      return (
        <NavItem
          navText={navItem}
          key={navItem.toLowerCase()}
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
