import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer>
      <div className="footer-link">
        <a href="https://github.com/MBright90/cv-application"><FontAwesomeIcon icon={faGithub} size="lg"/> MBright90</a>
      </div>
    </footer>
  )
}

export default Footer