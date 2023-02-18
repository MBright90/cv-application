import { Welcome } from '@components/home'
import { CreateTemplateButton } from '@utilities/buttons'
import PropTypes from 'prop-types'
import React from 'react'

import './style.css'

export default function HomeOverview(props) {
  return (
    <main>
      <div className="home-page-overview">
        <Welcome />
        <CreateTemplateButton changePageShown={props.changePageShown} />
      </div>
    </main>
  )
}

HomeOverview.propTypes = {
  changePageShown: PropTypes.func
}
