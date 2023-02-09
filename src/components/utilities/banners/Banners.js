import React from 'react'

import educationBackground from '../assets/images/education.jpg'
import experienceBackground from '../assets/images/experience.jpg'

const EducationBanner = () => {
  return (
    <div 
      className="banner"
      style={{ backgroundImage: `url(${educationBackground})` }}>
      <p>EDUCATION</p>   
    </div>
  )
}

const ExperienceBanner = () => {
  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${experienceBackground})` }}>
      <p>EXPERIENCE</p>
    </div>
  )
}

export  { EducationBanner, ExperienceBanner }