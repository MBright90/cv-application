import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSadTear } from '@fortawesome/free-solid-svg-icons'

import style from './style.module.css'

export default function ErrorPage() {
  return(
    <main>
      <div className={style.errorPageOverview}>
        <FontAwesomeIcon icon={faSadTear} />
        <h1 className={style.errorTitle}>Uh Oh!</h1>
        <p className={style.errorMessage}>Something went wrong.</p>
        <p className={style.errorMessage}>Please navigate to another tab or refresh your page.</p>
      </div>
    </main>
  )
}