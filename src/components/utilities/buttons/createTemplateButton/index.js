import { appContext } from '@app/appContext'
import React, { useContext } from 'react'

import style from './style.module.css'

export default function CreateTemplateButton() {
  const { changePageShown } = useContext(appContext)

  return (
    <div className={style.templateContainer}>
      <button className={style.createTemplateBtn} onClick={() => changePageShown('cv-template')}>
        Create Template
      </button>
    </div>
  )
}
