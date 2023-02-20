import { PageNav } from '@components/nav'
import PropTypes from 'prop-types'
import React from 'react'

import './style.module.css'

export default function Header(props) {
  return (
    <header>
      <h1>YOUR CV</h1>
      <PageNav currentPageShown={props.currentPageShown} changePageShown={props.changePageShown} />
    </header>
  )
}

Header.propTypes = {
  changePageShown: PropTypes.func,
  currentPageShown: PropTypes.string
}
