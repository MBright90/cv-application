import EducationOverview from '@components/education'
import ExperienceOverview from '@components/experience'
import HomeOverview, { CvTemplateOverview } from '@components/home'
import { Footer, Header } from '@components/nav'
import YouOverview from '@components/you'
import ErrorPage from '@utilities/error'
import React, { useContext } from 'react'

import { appContext } from './appContext'
import style from './style.module.css'

export default function App() {
  const { activePage } = useContext(appContext)

  let main
  if (activePage === 'home') main = <HomeOverview />
  else if (activePage === 'experience') main = <ExperienceOverview />
  else if (activePage === 'education') main = <EducationOverview />
  else if (activePage === 'you') main = <YouOverview />
  else if (activePage === 'cv-template') main = <CvTemplateOverview />
  else main = <ErrorPage />

  return (
    <div className={style.pageLayout}>
      <Header />
      {main}
      <Footer />
    </div>
  )
}
