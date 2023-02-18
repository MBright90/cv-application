import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import { PageNav } from '@components/nav'

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
