import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import { CreateTemplateButton } from '@utilities/buttons'
import { Welcome } from '@components/home'

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
  changePageShown: PropTypes.func,
  user: PropTypes.object
}
