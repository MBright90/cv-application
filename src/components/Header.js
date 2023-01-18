import React from 'react'
import PropTypes from 'prop-types'

import PageNav from './PageNav'

const Header = (props) => {

  return (
    <header>
      <h1>Your CV</h1>
      <PageNav changePageShown={props.changePageShown}/>
    </header>
  )
}

Header.propTypes = {
  changePageShown: PropTypes.func
}

export default Header