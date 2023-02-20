import React, { useContext } from 'react'

import { appContext } from '@app/appContext'

import style from './style.module.css'

export default function CreateTemplateButton(props) {

  const changePageShown = useContext(appContext)

  return (
    <div className={style.templateContainer}>
      <button
        className={style.createTemplateBtn}
        onClick={() => changePageShown('cv-template')}
      >
        Create Template
      </button>
    </div>
  )
}
