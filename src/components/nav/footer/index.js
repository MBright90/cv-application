import React from 'react'

import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer>
      <div className="footer-link">
        <a href="https://github.com/MBright90/cv-application">
          <FontAwesomeIcon icon={faGithub} size="lg" /> MBright90
        </a>
      </div>
    </footer>
  )
}
