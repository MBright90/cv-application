import { Welcome } from '@components/home'
import { CreateTemplateButton } from '@utilities/buttons'
import PropTypes from 'prop-types'
import React from 'react'

import style from './style.module.css'

export default function HomeOverview(props) {
  return (
    <main>
      <div className={style.homePageOverview}>
        <Welcome />
        <CreateTemplateButton changePageShown={props.changePageShown} />
      </div>
    </main>
  )
}

HomeOverview.propTypes = {
  changePageShown: PropTypes.func
}
