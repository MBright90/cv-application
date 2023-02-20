import { Welcome } from '@components/home'
import { CreateTemplateButton } from '@utilities/buttons'
import React from 'react'

import style from './style.module.css'

export default function HomeOverview(props) {

  return (
    <main>
      <div className={style.homePageOverview}>
        <Welcome />
        <CreateTemplateButton />
      </div>
    </main>
  )
}

